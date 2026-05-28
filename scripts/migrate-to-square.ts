/**
 * One-shot migration: pushes the hardcoded products from src/data/products.ts
 * into your Square Catalog as Items + ItemVariations.
 *
 * Usage:
 *   1) Set env vars (locally or via `export SQUARE_ACCESS_TOKEN=...`):
 *        SQUARE_ACCESS_TOKEN   — your Square access token (sandbox or prod)
 *        SQUARE_ENVIRONMENT    — "sandbox" or "production"
 *        SQUARE_LOCATION_ID    — the location to track inventory at
 *
 *   2) Dry run (no changes — prints what would be created):
 *        npm run migrate:square
 *
 *   3) Apply for real:
 *        npm run migrate:square -- --apply
 *
 *   4) Optionally clear inventory tracking for sold-out items by passing
 *        --include-sold (defaults to skipping items already marked sold).
 *
 * Idempotency: existing items with the same name are skipped, so re-running
 * is safe.
 *
 * Image upload: not handled here. Add product photos via Square Dashboard
 * after migration, or extend this script to call the catalog image upload
 * endpoint (multipart).
 */
import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "node:crypto";
import { products } from "../src/data/products";

const APPLY = process.argv.includes("--apply");
const INCLUDE_SOLD = process.argv.includes("--include-sold");

function die(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

const TOKEN = process.env.SQUARE_ACCESS_TOKEN || die("SQUARE_ACCESS_TOKEN not set");
const ENV = process.env.SQUARE_ENVIRONMENT === "production"
  ? SquareEnvironment.Production
  : SquareEnvironment.Sandbox;
const LOCATION_ID =
  process.env.SQUARE_LOCATION_ID || die("SQUARE_LOCATION_ID not set");

const client = new SquareClient({ token: TOKEN, environment: ENV });

async function listExistingNames(): Promise<Set<string>> {
  const names = new Set<string>();
  let cursor: string | undefined;
  do {
    const res = await client.catalog.search({
      objectTypes: ["ITEM"],
      limit: 100,
      cursor,
    });
    for (const obj of res.objects ?? []) {
      // Narrow to ITEM type to access itemData.
      if (obj.type === "ITEM" && obj.itemData?.name) {
        names.add(obj.itemData.name.toLowerCase().trim());
      }
    }
    cursor = res.cursor;
  } while (cursor);
  return names;
}

async function main() {
  console.log(
    `→ Square env: ${ENV} • location: ${LOCATION_ID} • mode: ${APPLY ? "APPLY" : "DRY-RUN"}`,
  );

  const existing = await listExistingNames();
  console.log(`  Found ${existing.size} existing item(s) in Square — these will be skipped.\n`);

  const toCreate = products.filter((p) => {
    if (!INCLUDE_SOLD && p.status === "sold") return false;
    return !existing.has(p.name.toLowerCase().trim());
  });

  if (toCreate.length === 0) {
    console.log("✓ Nothing to do — everything is already in Square.");
    return;
  }

  console.log(`  Will create ${toCreate.length} item(s):`);
  for (const p of toCreate) {
    const price = p.price != null ? `$${p.price}` : "(no price)";
    console.log(`    • ${p.name} — ${p.stone} — ${price}`);
  }
  console.log();

  if (!APPLY) {
    console.log("ℹ Dry-run only. Re-run with --apply to push to Square.");
    return;
  }

  // Build a batch upsert request. Each item gets a temp client-side ID
  // (must start with "#"), Square returns the permanent ID.
  const batches = chunk(toCreate, 25);
  let created = 0;

  for (const batch of batches) {
    const objects = batch.flatMap((p) => {
      const itemTempId = `#item_${slug(p.slug)}`;
      const variationTempId = `#var_${slug(p.slug)}`;
      const cents = p.price != null ? Math.round(p.price * 100) : 0;
      return [
        {
          type: "ITEM" as const,
          id: itemTempId,
          itemData: {
            name: p.name,
            description: p.description ?? p.alt,
            variations: [
              {
                type: "ITEM_VARIATION" as const,
                id: variationTempId,
                itemVariationData: {
                  itemId: itemTempId,
                  name: "Regular",
                  pricingType: "FIXED_PRICING" as const,
                  priceMoney: { amount: BigInt(cents), currency: "USD" },
                  trackInventory: true,
                  sku: p.slug,
                },
              },
            ],
          },
        },
      ];
    });

    const res = await client.catalog.batchUpsert({
      idempotencyKey: randomUUID(),
      batches: [{ objects }],
    });

    const idMap = new Map(
      (res.idMappings ?? []).map((m) => [m.clientObjectId!, m.objectId!]),
    );

    // After creation, set inventory counts (1 each — one-of-a-kind pieces).
    const adjustments = batch
      .map((p) => idMap.get(`#var_${slug(p.slug)}`))
      .filter((id): id is string => !!id)
      .map((catalogObjectId) => ({
        type: "PHYSICAL_COUNT" as const,
        physicalCount: {
          catalogObjectId,
          state: "IN_STOCK" as const,
          quantity: "1",
          locationId: LOCATION_ID,
          occurredAt: new Date().toISOString(),
        },
      }));

    if (adjustments.length) {
      await client.inventory.batchCreateChanges({
        idempotencyKey: randomUUID(),
        changes: adjustments,
      });
    }

    created += batch.length;
    console.log(`  ✓ Created ${created}/${toCreate.length}`);
  }

  console.log(`\n✓ Migration complete. ${created} item(s) in Square.`);
  console.log(`  Next: add product photos via Square Dashboard.`);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function slug(s: string): string {
  return s.replace(/[^a-zA-Z0-9_-]/g, "_");
}

main().catch((e) => {
  console.error("✗ Migration failed:", e);
  process.exit(1);
});
