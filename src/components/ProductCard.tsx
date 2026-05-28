import Image from "next/image";
import type { Product } from "@/data/products";
import { priceFormat, site } from "@/lib/site";
import { AddToCartButton } from "./AddToCartButton";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: Props) {
  const tone = product.toneHex ?? "#8a6a3f";
  const sold = product.status === "sold";

  const productLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ?? `${product.stone} earrings, handcrafted in Alaska.`,
    image: `${site.url}${product.image}`,
    brand: { "@type": "Brand", name: site.name },
  };
  if (product.price != null) {
    productLd.offers = {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    };
  } else {
    productLd.offers = {
      "@type": "Offer",
      availability: "https://schema.org/SoldOut",
      priceCurrency: "USD",
    };
  }

  return (
    <article className="group relative flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <div className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-stone-line">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            sold ? "opacity-80" : ""
          }`}
          priority={priority}
        />
        {sold && (
          <span className="absolute left-3 top-3 rounded-sm bg-stone-ink/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-bg">
            Sold
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-serif text-base leading-snug text-stone-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 truncate text-xs uppercase tracking-[0.14em] text-stone-ink-soft">
            <span
              aria-hidden
              className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
              style={{ backgroundColor: tone }}
            />
            {product.stone}
          </p>
        </div>
        <p className="shrink-0 font-serif text-base text-stone-ink">
          {product.price != null ? priceFormat(product.price) : (
            <span className="text-xs uppercase tracking-[0.18em] text-stone-ink-soft">
              Sold
            </span>
          )}
        </p>
      </div>
      <div className="mt-3">
        <AddToCartButton product={product} size="sm" className="w-full" />
      </div>
    </article>
  );
}
