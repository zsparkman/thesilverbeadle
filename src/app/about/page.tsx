import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Story — A solo studio in Chugiak, Alaska",
  description:
    "How The Silver Beadle began: one maker, semi-precious stones chosen by feel, sterling silver wrapped by hand. Every piece one of a kind.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        About
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        Made by one pair of hands, in a small studio at the edge of Alaska.
      </h1>

      <div className="relative mt-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm">
        <Image
          src="/images/products/silver-wrapped-ivory-fossilized-coral-drops.jpeg"
          alt="Studio work — silver-wrapped fossilized coral drop earrings"
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="prose-stone mt-10 space-y-6 text-stone-ink-soft">
        <p className="text-lg leading-relaxed text-stone-ink">
          The Silver Beadle began the way most studios do: with a tray of
          stones spread out under a desk lamp, and a question — what wants to
          become what?
        </p>
        <p>
          I&rsquo;m a solo maker. I choose stones by feel — the weight of an
          amethyst geode wedge, the green of a moss agate that looks like a
          frozen forest, the way fluorite bands purple into clear. The
          collection runs to earrings and bracelets, all wire-wrapped by hand
          in sterling silver. Nothing is mass-produced. Nothing is repeated.
        </p>
        <p>
          The Alaska part isn&rsquo;t a marketing line — it&rsquo;s the studio
          light, the long winters that lend themselves to slow, careful work,
          and the way mineral country trains an eye for what stones can do.
          When I cut a piece, I&rsquo;m thinking about geology: where it formed,
          what trapped the color, what mood it carries.
        </p>
        <p>
          Because every stone is one of a kind, every piece is one of a kind.
          If you find something on the site you love, it is, in the literal
          sense, the only one. If you want something specific — a particular
          stone, a particular length, a piece to match another — write me. I
          love a commission.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/shop"
          className="rounded-sm bg-stone-ink px-5 py-3 text-sm font-medium tracking-wide text-stone-bg transition hover:bg-stone-accent"
        >
          Shop the Collection
        </Link>
        <Link
          href="/#contact"
          className="rounded-sm border border-stone-ink/30 px-5 py-3 text-sm font-medium tracking-wide text-stone-ink transition hover:bg-stone-ink/5"
        >
          Get in touch
        </Link>
      </div>

      <p className="mt-10 text-sm text-stone-ink-soft">
        — {site.name}, {site.location}
      </p>
    </article>
  );
}
