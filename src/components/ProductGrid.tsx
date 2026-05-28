import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  prioritizeFirst?: boolean;
};

export function ProductGrid({ products, prioritizeFirst }: Props) {
  if (!products.length) return null;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard
          key={p.slug}
          product={p}
          priority={prioritizeFirst && i === 0}
        />
      ))}
    </div>
  );
}
