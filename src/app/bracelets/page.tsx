import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bracelets — Coming Soon",
  description:
    "Bracelets are in the works. Earrings are the current collection — moss agate, fluorite, jasper, chrysocolla, and more.",
  alternates: { canonical: "/bracelets" },
};

export default function BraceletsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        Collection
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Bracelets — coming soon
      </h1>
      <p className="mt-5 text-stone-ink-soft">
        The studio is building out a bracelet line. Until they&rsquo;re ready,
        explore the earring collection — every pair is one of a kind.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/earrings"
          className="rounded-sm bg-stone-ink px-5 py-3 text-sm font-medium tracking-wide text-stone-bg hover:bg-stone-accent"
        >
          See the Earrings
        </Link>
        <Link
          href="/#contact"
          className="rounded-sm border border-stone-ink/30 px-5 py-3 text-sm font-medium tracking-wide hover:bg-stone-ink/5"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
