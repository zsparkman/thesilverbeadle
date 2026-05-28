type Props = { className?: string };

/** Small decorative fireweed spike — used as a sparing Alaska accent. */
export function Fireweed({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 96"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <line
        x1="12"
        y1="96"
        x2="12"
        y2="22"
        stroke="#3a5a4a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="22" rx="2" ry="3.5" fill="#c45e80" />
      <ellipse cx="10.5" cy="32" rx="3" ry="4.5" fill="#c45e80" opacity="0.92" />
      <ellipse cx="13.5" cy="44" rx="3.5" ry="5" fill="#c45e80" opacity="0.85" />
      <ellipse cx="10" cy="57" rx="4" ry="6" fill="#c45e80" opacity="0.78" />
      <ellipse cx="14" cy="71" rx="4.5" ry="7" fill="#c45e80" opacity="0.7" />
      {/* Small leaf */}
      <path
        d="M 12,76 Q 20,78 22,84 Q 14,84 12,82 Z"
        fill="#3a5a4a"
        opacity="0.65"
      />
    </svg>
  );
}
