"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  className?: string;
  size?: "sm" | "md";
};

export function AddToCartButton({ product, className = "", size = "md" }: Props) {
  const { addProduct, lines } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = lines.some((l) => l.slug === product.slug);
  const sold = product.status === "sold" || product.price == null;

  const padding = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  if (sold) {
    return (
      <button
        type="button"
        disabled
        className={`${padding} cursor-not-allowed rounded-sm border border-stone-line text-stone-ink-soft ${className}`}
      >
        Sold
      </button>
    );
  }

  if (inCart) {
    return (
      <span
        className={`${padding} inline-flex items-center justify-center rounded-sm bg-stone-ink/10 text-stone-ink ${className}`}
      >
        In cart ✓
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addProduct(product);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1200);
      }}
      className={`${padding} rounded-sm bg-stone-ink font-medium tracking-wide text-stone-bg transition hover:bg-stone-accent ${className}`}
    >
      {justAdded ? "Added!" : "Add to cart"}
    </button>
  );
}
