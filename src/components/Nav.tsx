import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/earrings", label: "Earrings" },
  { href: "/bracelets", label: "Bracelets" },
  { href: "/about", label: "Story" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-line/70 bg-stone-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-stone-ink hover:text-stone-accent sm:text-xl"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-stone-ink-soft sm:gap-x-7">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-stone-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
