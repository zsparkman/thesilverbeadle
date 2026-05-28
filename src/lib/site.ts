export const site = {
  name: "The Silver Beadle",
  tagline: "Celebrating geology through jewelry",
  subTagline:
    "Wear a unique bit of Earth every day. Each piece is one of a kind.",
  description:
    "Handcrafted earrings and bracelets featuring semi-precious stones and sterling silver, made by a solo artisan in Chugiak, Alaska. Every piece is one of a kind.",
  location: "Chugiak, Alaska",
  email: "thesilverbeadle@gmail.com",
  address: "P.O. Box 671610, Chugiak, AK 99567",
  url: "https://thesilverbeadle.com",
  locale: "en_US",
  socials: {
    instagram: "https://www.instagram.com/thesilverbeadle",
    tiktok: "https://www.tiktok.com/@thesilverbeadle",
    facebook: "https://www.facebook.com/Alaskasilverbeadle",
  },
} as const;

export function priceFormat(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
