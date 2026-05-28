import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop the Collection",
  description:
    "The full catalog of one-of-a-kind earrings and bracelets — hand wire-wrapped in sterling silver around amethyst, jasper, moss agate, fluorite, and turquoise.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        Catalog
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Shop the Collection
      </h1>
      <p className="mt-4 max-w-prose text-stone-ink-soft">
        Every piece is wire-wrapped by hand and one of a kind. When something
        sells, it&rsquo;s gone — but commissions are always welcome.
      </p>
      {products.length > 0 ? (
        <div className="mt-12">
          <ProductGrid products={products} prioritizeFirst />
        </div>
      ) : (
        <p className="mt-12 text-stone-ink-soft">
          The shop is restocking. Follow along on Instagram for studio updates.
        </p>
      )}
    </div>
  );
}
