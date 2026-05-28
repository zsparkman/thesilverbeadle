import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { ContactForm } from "@/components/ContactForm";
import { AlaskaHero } from "@/components/AlaskaHero";
import { materials } from "@/data/products";
import { getFeaturedProducts } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O. Box 671610",
    addressLocality: "Chugiak",
    addressRegion: "AK",
    postalCode: "99567",
    addressCountry: "US",
  },
  sameAs: [
    site.socials.instagram,
    site.socials.tiktok,
    site.socials.facebook,
  ],
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />

      {/* HERO — illustrated Alaskan landscape */}
      <AlaskaHero>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-bg/90">
          Chugiak, Alaska
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-light leading-[1.05] text-stone-bg sm:text-5xl md:text-6xl lg:text-7xl">
          {site.tagline}
        </h1>
        <p className="mt-4 max-w-xl text-base text-stone-bg/90 sm:text-lg">
          {site.subTagline}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-sm bg-stone-bg px-5 py-3 text-sm font-medium tracking-wide text-stone-ink transition hover:bg-white"
          >
            Shop the Collection
          </Link>
          <Link
            href="/about"
            className="rounded-sm border border-stone-bg/70 px-5 py-3 text-sm font-medium tracking-wide text-stone-bg transition hover:bg-stone-bg/10"
          >
            Read the Story
          </Link>
        </div>
      </AlaskaHero>

      {/* STORY STRIP */}
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
              The Maker
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-stone-ink sm:text-4xl">
              One pair of hands, in a small studio at the edge of Alaska.
            </h2>
            <p className="mt-5 max-w-prose text-stone-ink-soft">
              I choose stones by feel — for the weight of a banded agate, the
              green of a moss agate that looks like a frozen forest, the way
              fluorite bands purple into clear. Each pair is wire-wrapped by
              hand in sterling silver, and no two are alike, because no two
              stones are alike.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-stone-ink hover:text-stone-accent"
            >
              The full story →
            </Link>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm">
            <Image
              src="/images/products/silver-wrapped-ivory-fossilized-coral-drops.jpeg"
              alt="Detail of silver-wrapped fossilized coral drop earrings"
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* COLLECTION — single card for now (bracelets coming later) */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8" aria-labelledby="collections">
        <h2 id="collections" className="font-serif text-3xl leading-tight sm:text-4xl">
          The Collection
        </h2>
        <Link
          href="/earrings"
          className="group relative mt-8 block aspect-[16/9] overflow-hidden rounded-sm"
        >
          <Image
            src="/images/products/labradorite-leaf-earrings.jpeg"
            alt="Earrings collection — labradorite leaf drops"
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-ink/80 via-stone-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-bg/80">
              Collection
            </p>
            <p className="mt-2 font-serif text-3xl text-stone-bg sm:text-4xl">
              Earrings →
            </p>
          </div>
        </Link>
      </section>

      {/* FEATURED — only renders when data exists */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="featured">
          <div className="flex items-end justify-between">
            <h2 id="featured" className="font-serif text-3xl leading-tight sm:text-4xl">
              Featured pieces
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-stone-ink-soft hover:text-stone-ink"
            >
              See all →
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* MATERIALS */}
      <section
        className="border-y border-stone-line bg-white/40 py-20"
        aria-labelledby="materials"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
            Know your stones
          </p>
          <h2 id="materials" className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            A short field guide
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((m) => (
              <div key={m.title}>
                <div
                  className="h-1.5 w-12 rounded-full"
                  style={{ backgroundColor: m.toneHex }}
                  aria-hidden
                />
                <h3 className="mt-4 font-serif text-xl">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-ink-soft">
                  {m.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL / UGC */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="social">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
              @thesilverbeadle
            </p>
            <h2 id="social" className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              From the studio
            </h2>
          </div>
          <div className="flex gap-4 text-sm text-stone-ink-soft">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-ink"
            >
              Instagram
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-ink"
            >
              TikTok
            </a>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[
            "tiger-iron-drop-earrings.jpeg",
            "fluorite-barrel-drop-earrings.jpeg",
            "rhodochrosite-strawberry-thunderstorm-earrings.jpeg",
            "chrysocolla-water-drop-clover-earrings.jpeg",
            "silver-wrapped-amazonite-tie-earrings.jpeg",
            "ocean-jasper-bloodstone-faceted-drops.jpeg",
          ].map((file, i) => (
            <div
              key={file}
              className="relative aspect-square overflow-hidden rounded-sm bg-stone-line"
            >
              <Image
                src={`/images/products/${file}`}
                alt={`Studio shot ${i + 1} — handcrafted stone earrings`}
                fill
                sizes="(min-width: 640px) 16vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-stone-line bg-white/40 py-20"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-serif text-3xl leading-tight sm:text-4xl"
            >
              Commissions, questions, hello.
            </h2>
            <p className="mt-4 max-w-prose text-stone-ink-soft">
              Looking for a particular stone or a custom pair? I love a
              commission. Send a note — I read every message.
            </p>
            <ul className="mt-6 space-y-1.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-stone-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-stone-ink-soft">{site.address}</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
