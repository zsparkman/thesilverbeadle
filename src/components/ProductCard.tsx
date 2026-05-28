import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { stoneTones } from "@/data/products";
import { priceFormat, site } from "@/lib/site";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: Props) {
  const tone = stoneTones[product.stone];
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${site.url}${product.image}`,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
  return (
    <article className="group relative flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <Link
        href={`/shop`}
        aria-label={`${product.name}, ${priceFormat(product.price)}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-stone-line"
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-base leading-snug text-stone-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-stone-ink-soft">
            <span
              aria-hidden
              className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
              style={{ backgroundColor: tone.hex }}
            />
            {tone.label}
          </p>
        </div>
        <p className="font-serif text-base text-stone-ink">
          {priceFormat(product.price)}
        </p>
      </div>
    </article>
  );
}
