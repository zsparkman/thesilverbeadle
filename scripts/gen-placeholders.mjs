// Generates subtle-gradient SVG placeholders for product imagery + hero/collection art.
// Run once: `node scripts/gen-placeholders.mjs`. Output: /public/images/*.svg
// Real photos drop in by replacing files (or pointing data/products.ts at .jpg/.webp).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

function svg(width, height, stops, label) {
  const id = `g${Math.random().toString(36).slice(2, 8)}`;
  const gradientStops = stops
    .map((s, i) => `<stop offset="${(i / (stops.length - 1)) * 100}%" stop-color="${s}"/>`)
    .join("");
  const grain = Array.from({ length: 60 })
    .map(() => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.4 + 0.2;
      const o = Math.random() * 0.08 + 0.02;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="black" fill-opacity="${o.toFixed(2)}"/>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">\n  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${gradientStops}</linearGradient></defs>\n  <rect width="${width}" height="${height}" fill="url(#${id})"/>\n  ${grain}\n</svg>\n`;
}

const products = [
  ["earrings-amethyst-cascade.svg", ["#3b2452", "#6b4f8f", "#c8b8e1"], "Amethyst earrings placeholder"],
  ["earrings-moss-agate.svg", ["#3b4a2a", "#5f6f4a", "#c9d6b3"], "Moss agate earrings placeholder"],
  ["earrings-jasper-ember.svg", ["#5b2c1a", "#a85a3c", "#e1bba0"], "Jasper earrings placeholder"],
  ["earrings-fluorite-spectrum.svg", ["#2f4a5a", "#4a7a8a", "#bcd6df"], "Fluorite earrings placeholder"],
  ["bracelet-amethyst-river.svg", ["#3b2452", "#6b4f8f", "#c8b8e1"], "Amethyst bracelet placeholder"],
  ["bracelet-turquoise-tide.svg", ["#1e5e58", "#3e9a8e", "#aedfd7"], "Turquoise bracelet placeholder"],
  ["bracelet-moss-agate-meadow.svg", ["#3b4a2a", "#5f6f4a", "#c9d6b3"], "Moss agate bracelet placeholder"],
  ["bracelet-jasper-canyon.svg", ["#5b2c1a", "#a85a3c", "#e1bba0"], "Jasper bracelet placeholder"],
];
for (const [name, stops, label] of products) {
  writeFileSync(resolve(outDir, name), svg(900, 1100, stops, label));
}

writeFileSync(
  resolve(outDir, "hero.svg"),
  svg(2400, 1400, ["#1d1a16", "#3a3530", "#8a6a3f", "#d8c9aa"], "Hero image placeholder"),
);
writeFileSync(
  resolve(outDir, "collection-earrings.svg"),
  svg(1400, 1000, ["#2c1f3a", "#6b4f8f", "#c8b8e1"], "Earrings collection placeholder"),
);
writeFileSync(
  resolve(outDir, "collection-bracelets.svg"),
  svg(1400, 1000, ["#1e5e58", "#3e9a8e", "#aedfd7"], "Bracelets collection placeholder"),
);
writeFileSync(
  resolve(outDir, "story-portrait.svg"),
  svg(1000, 1300, ["#2a2520", "#57514a", "#d8c9aa"], "Maker portrait placeholder"),
);
for (let i = 1; i <= 6; i++) {
  writeFileSync(
    resolve(outDir, `social-${i}.svg`),
    svg(800, 800, ["#1d1a16", "#57514a", "#a8967a"], `Social placeholder ${i}`),
  );
}

console.log("Wrote placeholders to", outDir);
