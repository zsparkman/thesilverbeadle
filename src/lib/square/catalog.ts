import "server-only";
import { getSquareClient } from "./client";
import type { Product, Category } from "@/data/products";

/**
 * Square Catalog → our internal `Product` shape.
 *
 * Square catalog model: a CatalogItem has many CatalogItemVariations.
 * For one-of-a-kind handmade pieces we assume one variation per item, so
 * the variation's price + stock become the product's price + stock.
 */

function mapCategory(name: string | undefined): Category {
  const lower = (name ?? "").toLowerCase();
  if (lower.includes("bracelet")) return "bracelets";
  return "earrings";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type SquareItem = {
  id?: string;
  type?: string;
  itemData?: {
    name?: string;
    description?: string;
    descriptionPlaintext?: string;
    categories?: { id?: string }[];
    imageIds?: string[];
    variations?: {
      id?: string;
      itemVariationData?: {
        name?: string;
        priceMoney?: { amount?: bigint | number; currency?: string };
        sku?: string;
        trackInventory?: boolean;
      };
    }[];
  };
};

type SquareImage = {
  id?: string;
  imageData?: { url?: string; name?: string; caption?: string };
};

type SquareCategory = { id?: string; categoryData?: { name?: string } };

/**
 * Fetch the full active product catalog from Square. Returns null when Square
 * isn't configured so callers can fall back to hardcoded data.
 */
export async function fetchSquareProducts(): Promise<Product[] | null> {
  const client = getSquareClient();
  if (!client) return null;

  try {
    // Pull items, images, and categories in one paginated sweep. For the
    // size of this catalog (<100 items) one page is enough; the SDK handles
    // pagination if it ever grows.
    const items: SquareItem[] = [];
    const images = new Map<string, SquareImage>();
    const categories = new Map<string, SquareCategory>();

    // searchCatalogObjects lets us pull items + images + categories together
    // without N+1 requests for images.
    let cursor: string | undefined = undefined;
    do {
      const res = await client.catalog.search({
        objectTypes: ["ITEM", "IMAGE", "CATEGORY"],
        includeRelatedObjects: true,
        cursor,
        limit: 100,
      });
      for (const obj of (res.objects ?? []) as SquareItem[]) {
        if (obj.type === "ITEM") items.push(obj);
      }
      for (const obj of (res.relatedObjects ?? []) as (SquareImage & SquareCategory)[]) {
        if (obj.id?.startsWith("ITEM_") || (obj as SquareImage).imageData) {
          images.set(obj.id!, obj as SquareImage);
        }
        if ((obj as SquareCategory).categoryData) {
          categories.set(obj.id!, obj as SquareCategory);
        }
      }
      cursor = res.cursor;
    } while (cursor);

    // Inventory counts — one batch call for all variations.
    const variationIds = items
      .flatMap((i) => i.itemData?.variations ?? [])
      .map((v) => v.id!)
      .filter(Boolean);

    const stockByVariation = new Map<string, number>();
    if (variationIds.length) {
      const locationId = process.env.SQUARE_LOCATION_ID;
      const page = await client.inventory.batchGetCounts({
        catalogObjectIds: variationIds,
        ...(locationId ? { locationIds: [locationId] } : {}),
      });
      // Page is async-iterable across pagination; for ~100 items one pass is fine.
      for await (const c of page) {
        if (c.catalogObjectId && c.quantity) {
          stockByVariation.set(c.catalogObjectId, Number(c.quantity));
        }
      }
    }

    const products: Product[] = items
      .map((item): Product | null => {
        const name = item.itemData?.name?.trim();
        if (!name) return null;

        const variation = item.itemData?.variations?.[0];
        const priceAmt = variation?.itemVariationData?.priceMoney?.amount;
        const priceUSD =
          priceAmt != null ? Number(priceAmt) / 100 : null;

        const stock = variation?.id
          ? stockByVariation.get(variation.id) ?? 0
          : 0;
        const tracksInv =
          variation?.itemVariationData?.trackInventory ?? false;
        const sold = tracksInv && stock <= 0;

        const firstImageId = item.itemData?.imageIds?.[0];
        const imageUrl = firstImageId
          ? images.get(firstImageId)?.imageData?.url
          : undefined;

        const catId = item.itemData?.categories?.[0]?.id;
        const catName = catId ? categories.get(catId)?.categoryData?.name : undefined;

        return {
          slug: slugify(name),
          name,
          category: mapCategory(catName),
          stone: catName ?? "Stone",
          price: sold ? null : priceUSD,
          status: sold ? "sold" : undefined,
          image: imageUrl ?? "/images/products/placeholder.png",
          alt: item.itemData?.description ?? name,
          description: item.itemData?.descriptionPlaintext ?? item.itemData?.description,
        };
      })
      .filter((p): p is Product => p !== null);

    return products;
  } catch (e) {
    // Square outage / bad creds — log on the server, let caller fall back.
    console.error("[square] fetchSquareProducts failed:", e);
    return null;
  }
}
