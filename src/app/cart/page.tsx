import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your selected one-of-a-kind pieces.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        Your selections
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Cart
      </h1>
      <CartView />
    </div>
  );
}
