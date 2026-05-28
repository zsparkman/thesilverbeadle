// One-shot: downloads real product photos from the live GoDaddy/wsimg CDN and
// saves them locally under /public/images/products/. The data file points at
// these local paths so the deployed site doesn't hotlink the old host.

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "public", "images", "products");
mkdirSync(outDir, { recursive: true });

// [slug, remote-file-tail] — tail is the filename portion of the wsimg URL.
const items = [
  ["banded-agate-earrings", "blob.png"],
  ["fossilized-coral-petal-earrings", "IMG_0556.jpeg"],
  ["black-banded-agate-kite-earrings", "IMG_0325.jpeg"],
  ["moss-agate-earrings-w-loop", "IMG_10878DF4-348E-4135-9138-B07CCDE02388.jpg"],
  ["chrysocolla-malachite-tie-earrings", "IMG_0431.jpeg"],
  ["chrysocolla-malachite-kite-earrings", "IMG_0524.jpeg"],
  ["polychrome-jasper-banana-earrings", "IMG_0316.jpeg"],
  ["polychrome-jasper-tie-earrings", "IMG_0121.jpeg"],
  ["labradorite-leaf-earrings", "IMG_0334.jpeg"],
  ["silver-wrapped-ivory-fossilized-coral-drops", "IMG_0114.jpeg"],
  ["fossilized-coral-tooth-earrings", "IMG_0528.jpeg"],
  ["saturn-chalcedony-oval-earrings", "IMG_0454.jpeg"],
  ["black-banded-agate-shield-earrings", "IMG_0328.jpeg"],
  ["silver-wrapped-fossilized-coral-drops-sold", "IMG_0117.jpeg"],
  ["orbicular-agate-dinosaur-egg-earrings", "IMG_0575.jpeg"],
  ["tiger-iron-drop-earrings", "IMG_0324.jpeg"],
  ["fluorite-scoop-earrings", "IMG_0568.jpeg"],
  ["ocean-jasper-tie-earrings", "IMG_0313.jpeg"],
  ["picasso-jasper-teeth-earrings-sold", "IMG_0119.jpeg"],
  ["saturn-chalcedony-tie-earrings", "IMG_0449.jpeg"],
  ["picasso-jasper-rectangle-earrings", "IMG_0530.jpeg"],
  ["african-jade-sword-earrings-sold", "IMG_0113.jpeg"],
  ["ammonite-earrings-sold", "IMG_0513-a2918b1.jpeg"],
  ["silver-wrapped-saturn-chalcedony-mixed-drops", "IMG_0123.jpeg"],
  ["silver-wrapped-sonora-sunrise-drops", "IMG_0120.jpeg"],
  ["teal-polychrome-jasper-tie-earrings", "IMG_0116.jpeg"],
  ["yellow-ivory-fossilized-drops", "IMG_0122.jpeg"],
  ["polychrome-jasper-drops", "IMG_0521.jpeg"],
  ["silver-wrapped-banded-calcite-triangle-earrings", "IMG_0317.jpeg"],
  ["fluorite-barrel-drop-earrings", "IMG_0623-464dde5.jpeg"],
  ["silver-wrapped-amazonite-tie-earrings", "IMG_0133.jpeg"],
  ["chrysocolla-malachite-turtle-feet-earrings-sold", "IMG_0427.jpeg"],
  ["rhodochrosite-strawberry-thunderstorm-earrings", "IMG_0124.jpeg"],
  ["chrysocolla-water-drop-clover-earrings", "IMG_0690.jpeg"],
  ["african-purple-scroll-clover-earrings", "IMG_0689.jpeg"],
  ["faceted-amethyst-orb-clover-earrings", "IMG_0630.jpeg"],
  ["red-purple-jasper-drop-earrings", "IMG_0673.jpeg"],
  ["silver-wrapped-chrysocolla-drops", "IMG_0128.jpeg"],
  ["ruby-zoisite-clover-drop-earrings", "IMG_0671.jpeg"],
  ["orbicular-agate-earrings-sold", "IMG_0561.jpeg"],
  ["ruby-zoisite-watermelon-slice-earrings", "IMG_0569.jpeg"],
  ["fancy-jasper-orbs-copper-butterflies", "IMG_0625.jpeg"],
  ["mookaite-smoky-topaz-pearl-copper-earrings", "IMG_0633.jpeg"],
  ["ocean-jasper-bloodstone-faceted-drops", "IMG_0618-5e6b89a.jpeg"],
];

const BASE =
  "https://img1.wsimg.com/isteam/ip/23e0c23a-f0da-49af-b89c-59efb08ae476/";

let done = 0;
let skipped = 0;
let failed = 0;
const errors = [];

for (const [slug, tail] of items) {
  // Preserve the original extension on disk for next/image's content-type sniff.
  const ext = tail.toLowerCase().endsWith(".png")
    ? ".png"
    : tail.toLowerCase().endsWith(".jpg")
      ? ".jpg"
      : ".jpeg";
  const out = resolve(outDir, `${slug}${ext}`);
  if (existsSync(out)) {
    skipped++;
    continue;
  }
  // Ask for a reasonable rendered size — isteam quality/width transform.
  const url = `${BASE}${tail}/:/rs=w:1200,h:1200,cg:true,m/qt=q:90`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Safari/605.1.15",
        Accept: "image/avif,image/webp,image/*,*/*",
        Referer: "https://thesilverbeadle.com/",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(out, buf);
    done++;
    process.stdout.write(`✓ ${slug}${ext} (${buf.length} bytes)\n`);
  } catch (e) {
    failed++;
    errors.push([slug, e.message]);
    process.stdout.write(`✗ ${slug}: ${e.message}\n`);
  }
}

console.log(`\nDownloaded ${done}, skipped ${skipped}, failed ${failed}`);
if (errors.length) {
  console.log("Failures:");
  for (const [s, m] of errors) console.log(`  - ${s}: ${m}`);
}
