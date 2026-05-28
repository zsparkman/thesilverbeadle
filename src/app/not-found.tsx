import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-accent">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        That page is one of a kind — and we couldn&rsquo;t find it.
      </h1>
      <p className="mt-4 text-stone-ink-soft">
        Try the collection, or head home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-sm bg-stone-ink px-5 py-3 text-sm font-medium tracking-wide text-stone-bg hover:bg-stone-accent"
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="rounded-sm border border-stone-ink/30 px-5 py-3 text-sm font-medium tracking-wide hover:bg-stone-ink/5"
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
