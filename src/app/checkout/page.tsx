import type { Metadata } from "next";
import { CheckoutPlaceholder } from "./CheckoutPlaceholder";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        Checkout
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Almost there.
      </h1>
      <CheckoutPlaceholder />
    </div>
  );
}
