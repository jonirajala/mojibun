interface Props {
  size?: number;
  className?: string;
}

/**
 * Yappari logo — a speech bubble (やっぱり = "I knew it!")
 * with a torii gate silhouette inside. Clean, minimal, Japanese-inspired.
 */
export function Logo({ size = 64, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      {/* Rounded square background */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="var(--color-primary)" />

      {/* Torii gate — simple, iconic Japanese symbol */}
      <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Top beam (kasagi) */}
        <path d="M16 22 L48 22" />
        {/* Secondary beam (nuki) */}
        <path d="M18 28 L46 28" />
        {/* Left pillar */}
        <path d="M22 22 L22 46" />
        {/* Right pillar */}
        <path d="M42 22 L42 46" />
        {/* Top curve (sorimashi) */}
        <path d="M14 23 Q32 16 50 23" />
      </g>
    </svg>
  );
}

/**
 * Small inline logo mark for headers etc.
 */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <rect x="4" y="4" width="56" height="56" rx="16" fill="var(--color-primary)" />
      <g stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22 L48 22" />
        <path d="M18 28 L46 28" />
        <path d="M22 22 L22 46" />
        <path d="M42 22 L42 46" />
        <path d="M14 23 Q32 16 50 23" />
      </g>
    </svg>
  );
}
