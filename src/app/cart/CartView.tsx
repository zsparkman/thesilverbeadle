"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { priceFormat } from "@/lib/site";

export function CartView() {
  const { lines, isHydrated, remove, subtotal } = useCart();

  if (!isHydrated) {
    return <p className="mt-10 text-stone-ink-soft">Loading your cart…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-stone-ink-soft">
          Your cart is empty. The collection is full of one-of-a-kind pieces —
          go pick a few.
        </p>
        <div className="mt-6">
          <Link
            href="/shop"
            className="inline-flex rounded-sm bg-stone-ink px-5 py-3 text-sm font-medium tracking-wide text-stone-bg hover:bg-stone-accent"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <ul className="divide-y divide-stone-line border-y border-stone-line">
        {lines.map((l) => (
          <li key={l.slug} className="flex gap-4 py-5">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-stone-line">
              <Image
                src={l.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-serif text-base text-stone-ink">{l.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-stone-ink-soft">
                  {l.stone}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(l.slug)}
                className="self-start text-xs uppercase tracking-[0.14em] text-stone-ink-soft hover:text-stone-accent"
              >
                Remove
              </button>
            </div>
            <p className="shrink-0 self-start font-serif text-base text-stone-ink">
              {priceFormat(l.price)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-sm border border-stone-line bg-white/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-ink-soft">
            Summary
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-ink-soft">Subtotal</dt>
              <dd className="font-medium">{priceFormat(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-stone-ink-soft">
              <dt>Shipping &amp; tax</dt>
              <dd className="italic">Calculated at checkout</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-sm bg-stone-ink px-5 py-3 text-center text-sm font-medium tracking-wide text-stone-bg transition hover:bg-stone-accent"
          >
            Proceed to checkout
          </Link>
          <p className="mt-3 text-xs text-stone-ink-soft">
            Secure checkout powered by Square. Apple Pay supported.
          </p>
        </div>
      </aside>
    </div>
  );
}
