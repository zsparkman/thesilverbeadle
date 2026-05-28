export type Category = "earrings" | "bracelets";

export type Stone =
  | "amethyst"
  | "jasper"
  | "moss-agate"
  | "fluorite"
  | "turquoise";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  stone: Stone;
  price: number;
  image: string;
  alt: string;
  description: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "amethyst-cascade-earrings",
    name: "Amethyst Cascade Earrings",
    category: "earrings",
    stone: "amethyst",
    price: 68,
    image: "/images/earrings-amethyst-cascade.svg",
    alt: "Sterling silver wire-wrapped earrings with cascading raw amethyst beads in deep violet",
    description:
      "Raw amethyst beads in violet and lavender, hand wire-wrapped in sterling silver. A single one-of-a-kind pair.",
    featured: true,
  },
  {
    slug: "moss-agate-drop-earrings",
    name: "Moss Agate Drop Earrings",
    category: "earrings",
    stone: "moss-agate",
    price: 62,
    image: "/images/earrings-moss-agate.svg",
    alt: "Moss agate drop earrings in soft green and milky white, sterling silver findings",
    description:
      "Moss agate teardrops with mineral inclusions that look like miniature forests. Sterling silver ear wires.",
    featured: true,
  },
  {
    slug: "jasper-ember-earrings",
    name: "Jasper Ember Earrings",
    category: "earrings",
    stone: "jasper",
    price: 58,
    image: "/images/earrings-jasper-ember.svg",
    alt: "Warm red jasper round earrings wire-wrapped in sterling silver",
    description:
      "Red jasper rounds wrapped in fine sterling silver. Warm earth tones, suitable for everyday wear.",
  },
  {
    slug: "fluorite-spectrum-earrings",
    name: "Fluorite Spectrum Earrings",
    category: "earrings",
    stone: "fluorite",
    price: 72,
    image: "/images/earrings-fluorite-spectrum.svg",
    alt: "Rainbow fluorite earrings with banded purple, green, and clear quartz tones, sterling silver wire",
    description:
      "Rainbow fluorite with banded purple, green, and clear quartz tones. Each stone is naturally one-of-a-kind.",
    featured: true,
  },
  {
    slug: "amethyst-river-bracelet",
    name: "Amethyst River Bracelet",
    category: "bracelets",
    stone: "amethyst",
    price: 88,
    image: "/images/bracelet-amethyst-river.svg",
    alt: "Amethyst bracelet of tumbled violet stones strung on sterling silver wire",
    description:
      "Tumbled amethyst rounds threaded along a single hand-formed sterling silver wire. Adjustable closure.",
    featured: true,
  },
  {
    slug: "turquoise-tide-bracelet",
    name: "Turquoise Tide Bracelet",
    category: "bracelets",
    stone: "turquoise",
    price: 94,
    image: "/images/bracelet-turquoise-tide.svg",
    alt: "Turquoise bracelet with bright sky-blue stones and sterling silver clasp",
    description:
      "Sky-blue turquoise rounds set against a sterling silver clasp. Bright, light, made for layering.",
  },
  {
    slug: "moss-agate-meadow-bracelet",
    name: "Moss Agate Meadow Bracelet",
    category: "bracelets",
    stone: "moss-agate",
    price: 82,
    image: "/images/bracelet-moss-agate-meadow.svg",
    alt: "Moss agate bracelet, banded green and white stones on hand-twisted sterling silver",
    description:
      "Hand-twisted sterling silver carrying moss agate stones with deep green dendritic inclusions.",
  },
  {
    slug: "jasper-canyon-bracelet",
    name: "Jasper Canyon Bracelet",
    category: "bracelets",
    stone: "jasper",
    price: 78,
    image: "/images/bracelet-jasper-canyon.svg",
    alt: "Picture jasper bracelet, warm desert tones, sterling silver wire-wrapped",
    description:
      "Picture jasper in desert reds and ochres. Wire-wrapped in sterling silver, each stone unique.",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function byCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function bySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const stoneTones: Record<Stone, { hex: string; accent: string; label: string }> = {
  amethyst: { hex: "#6b4f8f", accent: "#c8b8e1", label: "Amethyst" },
  jasper: { hex: "#a85a3c", accent: "#e1bba0", label: "Jasper" },
  "moss-agate": { hex: "#5f6f4a", accent: "#c9d6b3", label: "Moss Agate" },
  fluorite: { hex: "#4a7a8a", accent: "#bcd6df", label: "Fluorite" },
  turquoise: { hex: "#3e9a8e", accent: "#aedfd7", label: "Turquoise" },
};

export const materials: { stone: Stone; title: string; blurb: string }[] = [
  {
    stone: "amethyst",
    title: "Amethyst",
    blurb:
      "A violet quartz formed in volcanic geodes — iron impurities and natural radiation give amethyst its color. Long associated with clarity and quiet thinking.",
  },
  {
    stone: "jasper",
    title: "Jasper",
    blurb:
      "An opaque variety of chalcedony, banded with iron oxides. Earth tones of red, ochre, and brown make each cut a small landscape.",
  },
  {
    stone: "moss-agate",
    title: "Moss Agate",
    blurb:
      "Translucent chalcedony with dendritic mineral inclusions — manganese and iron grow inward like tiny forests, frozen mid-bloom.",
  },
  {
    stone: "fluorite",
    title: "Fluorite",
    blurb:
      "Calcium fluoride crystallized into cubes and bands of purple, green, and clear. Fluoresces under UV light — the source of the word itself.",
  },
];
