/**
 * FA monogram — the site's one mark.
 *
 * Construction: the F's middle arm and the A's crossbar sit on the same line
 * (y=16.6), which is what fuses two letters into a single glyph rather than a
 * pair of initials. The A's apex overshoots the F's cap line by ~1.2 units
 * because pointed shapes read as short when they are mathematically level.
 *
 * Drawn with strokes at a single weight so it stays crisp down to 16px, and
 * painted with `currentColor` so it inherits the theme instead of needing a
 * light and a dark asset.
 */

const GEOMETRY = (
  <>
    <path d="M4.6 27.2V6.4h9.2" />
    <path d="M4.6 16.6h7.2" />
    <path d="M18.8 27.2 25.4 5.2l6.6 22" />
    <path d="M21.4 16.6h8" />
  </>
);

/** The open mark. Sits inline next to the wordmark in the nav. */
export function LogoMark({ size = 20, className, title }) {
  return (
    <svg
      viewBox="0 0 36 32"
      height={size}
      width={(size * 36) / 32}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
    >
      {GEOMETRY}
    </svg>
  );
}

/**
 * The enclosed lockup: same glyph on a filled plate. Used where the mark has
 * to survive an unknown background — favicon, app icon, share card.
 */
export function LogoPlate({ size = 32, className, plate = '#0c0c0d', glyph = '#f3f3f4' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      height={size}
      width={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7.5" fill={plate} />
      <g
        fill="none"
        stroke={glyph}
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.4 24V9.2h6.6" />
        <path d="M7.4 16.6h5.2" />
        <path d="M17.4 24l5-14.8 5 14.8" />
        <path d="M19.3 18.4h6.2" />
      </g>
    </svg>
  );
}

export default LogoMark;
