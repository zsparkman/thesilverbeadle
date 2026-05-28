import "server-only";
import { cache } from "react";
import {
  products as fallbackProducts,
  byCategory as fallbackByCategory,
  bySlug as fallbackBySlug,
  type Product,
  type Category,
} from "@/data/products";
import { fetchSquareProducts } from "@/lib/square/catalog";

export type { Product, Category };

/**
 * Single source of truth at runtime: try Square Catalog; if it isn't
 * configured or fails, fall back to the hardcoded data so the site never
 * goes empty. Result is memoized per request via React `cache`.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  const fromSquare = await fetchSquareProducts();
  if (fromSquare && fromSquare.length > 0) return fromSquare;
  return fallbackProducts;
});

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  // If Square doesn't mark anything as featured, surface the first four
  // in-stock items so the home page never empties out.
  if (featured.length === 0) {
    return all.filter((p) => p.status !== "sold").slice(0, 4);
  }
  return featured;
}

export async function getByCategory(category: Category): Promise<Product[]> {
  const all = await getProducts();
  const filtered = all.filter((p) => p.category === category);
  // Square may not have category metadata yet; fall back to local categorization.
  if (filtered.length === 0) return fallbackByCategory(category);
  return filtered;
}

export async function getBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? fallbackBySlug(slug);
}
