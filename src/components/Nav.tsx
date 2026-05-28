import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/earrings", label: "Earrings" },
  { href: "/about", label: "Story" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-line/70 bg-stone-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 sm:px-8 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-stone-ink hover:text-stone-accent"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <span className="font-serif text-lg tracking-tight sm:text-xl">
            {site.name}
          </span>
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
