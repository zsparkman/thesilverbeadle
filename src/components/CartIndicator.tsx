"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";

export function CartIndicator() {
  const { count, isHydrated } = useCart();
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-1 text-stone-ink-soft transition-colors hover:text-stone-ink"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
        <circle cx="10" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
      </svg>
      <span className="text-sm">Cart</span>
      {isHydrated && count > 0 && (
        <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-ink px-1 text-[10px] font-semibold text-stone-bg">
          {count}
        </span>
      )}
    </Link>
  );
}
