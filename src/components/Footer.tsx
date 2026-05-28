import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-line/70 bg-stone-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm text-stone-ink-soft">
            {site.description}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-ink-soft">
            Visit
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-stone-accent">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/earrings" className="hover:text-stone-accent">
                Earrings
              </Link>
            </li>
            <li>
              <Link href="/bracelets" className="hover:text-stone-accent">
                Bracelets
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-stone-accent">
                The Story
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-ink-soft">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-stone-accent">
                {site.email}
              </a>
            </li>
            <li className="text-stone-ink-soft">{site.address}</li>
          </ul>
          <ul className="mt-5 flex gap-4 text-sm">
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-accent"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-accent"
                aria-label="TikTok"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-accent"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-line/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-stone-ink-soft sm:flex-row sm:items-center sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p>Handmade in {site.location}.</p>
        </div>
      </div>
    </footer>
  );
}
