import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { byCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Sterling Silver Stone Bracelets",
  description:
    "One-of-a-kind bracelets in amethyst, turquoise, moss agate, and jasper — wire-wrapped in sterling silver in Chugiak, Alaska.",
  alternates: { canonical: "/bracelets" },
};

export default function BraceletsPage() {
  const items = byCategory("bracelets");
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        Collection
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Bracelets
      </h1>
      <p className="mt-4 max-w-prose text-stone-ink-soft">
        Strung and wire-wrapped bracelets in semi-precious stones. Each piece
        below is one of a kind.
      </p>
      {items.length > 0 ? (
        <div className="mt-12">
          <ProductGrid products={items} prioritizeFirst />
        </div>
      ) : (
        <p className="mt-12 text-stone-ink-soft">
          New pieces are listed soon — follow along on Instagram for studio
          updates.
        </p>
      )}
    </div>
  );
}
