# The Silver Beadle

Editorial-story storefront for handcrafted stone jewelry — a solo studio in Chugiak, Alaska.

> Celebrating geology through jewelry. Each piece is one of a kind.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and `next/image` + `next/font` for performance.

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Deploy

This project deploys to Vercel. The repository is linked to a Vercel project, so:

- Pushing to `main` triggers a production deployment automatically.
- Or run `vercel deploy --prod --yes` from the project root.

The live production URL is a default `*.vercel.app` URL. `thesilverbeadle.com` is **not** pointed at Vercel — it still serves from the old host. DNS cutover is a deliberate follow-up step.

## Editing content

- **Products** — single source of truth at `src/data/products.ts`. Add/edit entries here; the home page, `/shop`, `/earrings`, and `/bracelets` will reflect changes automatically.
- **Site info** — name, tagline, email, address, socials live in `src/lib/site.ts`.
- **Images** — drop replacements into `public/images/` using the same filenames the data layer points at. Placeholders are SVG; replace with optimized JPG/WebP (e.g. `earrings-amethyst-cascade.jpg`) and update the `image` path in `src/data/products.ts`. To regenerate placeholder SVGs: `node scripts/gen-placeholders.mjs`.

## Deferred / post-launch

- [ ] Replace placeholder SVGs with real product photography
- [ ] Wire the contact form to a real handler (Formspree, Resend, or an `app/api/contact` route)
- [ ] Point `thesilverbeadle.com` DNS at Vercel when ready to cut over
- [ ] Add Open Graph image (proper 1200×630 PNG/JPG) for richer link previews

## Copyright

© The Silver Beadle. All Rights Reserved. Designs, photography, and content on this site are not licensed for redistribution.
