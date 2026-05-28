"use client";

/* eslint-disable @next/next/no-img-element */
// =============================================================================
// EASTER EGG — DELETE TO REMOVE
// =============================================================================
// To remove this entirely:
//   1. Delete this file: src/components/ChickenSnipe.tsx
//   2. Delete the import + <ChickenSnipe /> tag in src/app/layout.tsx
//      (look for the "// EASTER EGG" markers there)
//   3. Delete the asset: public/easter-egg/chicken-dance.webp
// =============================================================================

import { useEffect, useState } from "react";

const INTERVAL_MS = 15_000;
const VISIBLE_MS = 4_000;

const CAPTIONS = [
  "GEOLOGY!",
  "BUY EARRINGS",
  "WIRE-WRAPPED",
  "ALASKAN!",
  "AMETHYST!!!",
  "ROCKS!!!",
  "CLUCK CLUCK",
  "STERLING SILVER",
  "ONE OF A KIND",
];

// 4 corners; the chicken rotates through them so it doesn't camp one spot.
const CORNERS = [
  { pos: "bottom-4 right-4 sm:bottom-6 sm:right-6", origin: "right" as const },
  { pos: "bottom-4 left-4 sm:bottom-6 sm:left-6", origin: "left" as const },
  { pos: "top-20 right-4 sm:top-24 sm:right-6", origin: "right" as const },
  { pos: "top-20 left-4 sm:top-24 sm:left-6", origin: "left" as const },
];

export function ChickenSnipe() {
  const [tick, setTick] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setVisible(true);
      window.setTimeout(() => setVisible(false), VISIBLE_MS);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  if (tick < 0 || !visible) return null;

  const corner = CORNERS[tick % CORNERS.length];
  const caption = CAPTIONS[tick % CAPTIONS.length];
  const rotation = (tick * 137) % 18 - 9; // -9°..+9°, deterministic
  const captionFirst = corner.origin === "right";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed z-40 ${corner.pos} flex items-end gap-2`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {captionFirst && <Caption text={caption} />}
      <img
        src="/easter-egg/chicken-dance.webp"
        alt=""
        width={170}
        height={170}
        className="drop-shadow-2xl motion-safe:animate-[chicken-pop_400ms_cubic-bezier(.34,1.56,.64,1)] motion-reduce:opacity-100"
        style={{ animationFillMode: "both" }}
      />
      {!captionFirst && <Caption text={caption} />}
      <style>{`
        @keyframes chicken-pop {
          0%   { transform: translateY(40px) scale(0.4); opacity: 0; }
          60%  { transform: translateY(-6px) scale(1.08); opacity: 1; }
          100% { transform: translateY(0)    scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <div className="mb-2 -rotate-3 select-none whitespace-nowrap rounded-md bg-yellow-300 px-2.5 py-1 text-sm font-extrabold uppercase tracking-tight text-stone-900 shadow-lg ring-2 ring-yellow-500">
      {text}
    </div>
  );
}
