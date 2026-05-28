type Props = { children: React.ReactNode };

/**
 * Illustrated Alaskan landscape hero — sky, distant range, main mountain range
 * (the divider), and Prince William Sound at the bottom. Birch grove + a few
 * fireweed spikes on the foreground shoreline.
 *
 * Palette is fixed-by-brand: sky #9CD6D6, mountains #4E9C9C, water #255757.
 */
export function AlaskaHero({ children }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/8] md:aspect-[21/9]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          {/* Sky */}
          <rect width="1600" height="900" fill="#9CD6D6" />

          {/* Soft cloud washes */}
          <ellipse cx="450" cy="180" rx="220" ry="20" fill="#ffffff" opacity="0.14" />
          <ellipse cx="1150" cy="120" rx="260" ry="18" fill="#ffffff" opacity="0.12" />
          <ellipse cx="800" cy="260" rx="180" ry="14" fill="#ffffff" opacity="0.10" />

          {/* Distant range — lighter, behind */}
          <path
            d="M 0,560 L 100,520 L 220,545 L 360,470 L 470,510 L 600,440 L 730,495 L 860,460 L 980,505 L 1110,455 L 1250,500 L 1390,470 L 1540,510 L 1600,490 L 1600,900 L 0,900 Z"
            fill="#7ec1c1"
          />

          {/* Main Alaskan range — the divider between sky and the rest */}
          <path
            d="M 0,580 L 60,510 L 140,440 L 230,540 L 320,360 L 420,510 L 510,300 L 620,490 L 690,400 L 790,260 L 890,490 L 985,340 L 1080,470 L 1190,300 L 1300,470 L 1380,380 L 1470,500 L 1550,420 L 1600,500 L 1600,900 L 0,900 Z"
            fill="#4E9C9C"
          />

          {/* Snowcaps on the tallest peaks */}
          <path d="M 510,300 L 540,338 L 480,338 Z" fill="#ffffff" opacity="0.75" />
          <path d="M 790,260 L 826,302 L 754,302 Z" fill="#ffffff" opacity="0.88" />
          <path d="M 1190,300 L 1224,340 L 1156,340 Z" fill="#ffffff" opacity="0.7" />

          {/* Prince William Sound */}
          <path
            d="M 0,680 C 200,672 400,690 600,682 C 800,674 1000,690 1200,684 C 1400,678 1500,688 1600,684 L 1600,900 L 0,900 Z"
            fill="#255757"
          />

          {/* Water ripples */}
          <path
            d="M 80,720 Q 220,716 360,720 T 640,720"
            stroke="#9CD6D6"
            strokeWidth="2"
            fill="none"
            opacity="0.28"
          />
          <path
            d="M 240,770 Q 460,766 680,770 T 1100,770"
            stroke="#9CD6D6"
            strokeWidth="2"
            fill="none"
            opacity="0.22"
          />
          <path
            d="M 600,820 Q 900,816 1200,820 T 1600,820"
            stroke="#9CD6D6"
            strokeWidth="2"
            fill="none"
            opacity="0.16"
          />

          {/* Birch grove — right foreground */}
          <g>
            <rect x="1300" y="470" width="9" height="225" fill="#f0eee8" />
            <rect x="1300" y="510" width="9" height="3" fill="#1d1a16" opacity="0.55" />
            <rect x="1301" y="555" width="7" height="2" fill="#1d1a16" opacity="0.5" />
            <rect x="1300" y="605" width="9" height="3" fill="#1d1a16" opacity="0.55" />
            <rect x="1302" y="650" width="6" height="2" fill="#1d1a16" opacity="0.5" />
          </g>
          <g>
            <rect x="1346" y="500" width="7" height="195" fill="#f0eee8" />
            <rect x="1346" y="535" width="7" height="2" fill="#1d1a16" opacity="0.5" />
            <rect x="1347" y="580" width="5" height="2" fill="#1d1a16" opacity="0.45" />
            <rect x="1346" y="625" width="7" height="2" fill="#1d1a16" opacity="0.5" />
          </g>
          <g>
            <rect x="1388" y="488" width="8" height="207" fill="#f0eee8" />
            <rect x="1388" y="525" width="8" height="3" fill="#1d1a16" opacity="0.55" />
            <rect x="1389" y="575" width="6" height="2" fill="#1d1a16" opacity="0.5" />
            <rect x="1388" y="630" width="8" height="3" fill="#1d1a16" opacity="0.55" />
          </g>

          {/* Fireweed — shoreline accents in muted magenta */}
          <g transform="translate(1255, 690)">
            <line x1="0" y1="0" x2="0" y2="-95" stroke="#3a5a4a" strokeWidth="1.4" strokeLinecap="round" />
            <ellipse cx="0" cy="-88" rx="2" ry="3.5" fill="#c45e80" />
            <ellipse cx="-1.5" cy="-78" rx="3" ry="4.5" fill="#c45e80" opacity="0.92" />
            <ellipse cx="2" cy="-66" rx="3.5" ry="5" fill="#c45e80" opacity="0.86" />
            <ellipse cx="-2" cy="-54" rx="4" ry="6" fill="#c45e80" opacity="0.8" />
          </g>
          <g transform="translate(1432, 695)">
            <line x1="0" y1="0" x2="0" y2="-78" stroke="#3a5a4a" strokeWidth="1.2" strokeLinecap="round" />
            <ellipse cx="0" cy="-72" rx="2" ry="3" fill="#b35272" />
            <ellipse cx="1" cy="-63" rx="2.5" ry="4" fill="#b35272" opacity="0.9" />
            <ellipse cx="-1" cy="-52" rx="3" ry="5" fill="#b35272" opacity="0.84" />
          </g>
          <g transform="translate(1500, 692)">
            <line x1="0" y1="0" x2="0" y2="-90" stroke="#3a5a4a" strokeWidth="1.3" strokeLinecap="round" />
            <ellipse cx="0" cy="-83" rx="2.2" ry="3.4" fill="#c45e80" />
            <ellipse cx="-1.5" cy="-72" rx="3" ry="4.5" fill="#c45e80" opacity="0.9" />
            <ellipse cx="1.5" cy="-60" rx="3.5" ry="5.5" fill="#c45e80" opacity="0.84" />
          </g>
        </svg>

        {/* Subtle bottom shade for text legibility against the water */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2828]/45 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8 sm:pb-16 md:pb-20">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
