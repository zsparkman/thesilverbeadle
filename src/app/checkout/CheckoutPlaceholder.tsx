"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { priceFormat, site } from "@/lib/site";

export function CheckoutPlaceholder() {
  const { lines, subtotal, isHydrated } = useCart();

  if (!isHydrated) return <p className="mt-6 text-stone-ink-soft">Loading…</p>;

  if (lines.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-stone-ink-soft">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-sm bg-stone-ink px-5 py-3 text-sm font-medium tracking-wide text-stone-bg hover:bg-stone-accent"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  const orderSummary = lines
    .map((l) => `${l.name} — ${priceFormat(l.price)}`)
    .join("%0D%0A");
  const body = `Hi — I'd like to purchase the following piece(s):%0D%0A%0D%0A${orderSummary}%0D%0A%0D%0ASubtotal: ${priceFormat(
    subtotal,
  )}%0D%0A%0D%0AName:%0D%0AShipping address:`;

  return (
    <>
      <p className="mt-4 text-stone-ink-soft">
        Online payment (Apple Pay, cards via Square) is being wired up — until
        it ships, send a note and I&rsquo;ll reply with an invoice link.
      </p>
      <a
        href={`mailto:${site.email}?subject=${encodeURIComponent("Order from thesilverbeadle.com")}&body=${body}`}
        className="mt-6 inline-flex rounded-sm bg-stone-ink px-5 py-3 text-sm font-medium tracking-wide text-stone-bg hover:bg-stone-accent"
      >
        Email order request
      </a>
      <div className="mt-10 rounded-sm border border-stone-line bg-white/40 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-ink-soft">
          Order preview
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {lines.map((l) => (
            <li key={l.slug} className="flex justify-between">
              <span>{l.name}</span>
              <span>{priceFormat(l.price)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-stone-line pt-3 text-sm font-medium">
          <span>Subtotal</span>
          <span>{priceFormat(subtotal)}</span>
        </div>
      </div>
    </>
  );
}
