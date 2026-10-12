import './Logo.css';

/**
 * FZN monogram — the site's one mark (F + Z + N interlocked).
 *
 * Rendered from two transparent PNGs so it stays crisp and theme-correct:
 *   - brand  (navy #091d36 + cyan #03f8fc) — for light surfaces
 *   - light  (#e9eaec + cyan #03f8fc)     — for dark surfaces
 *
 * CSS toggles them via [data-theme] on <html>; no JS needed. `size` is the
 * rendered height in px — width follows the asset's natural aspect ratio, so
 * it never distorts and scales cleanly at any size (source is 512px wide).
 */
export function LogoMark({ size = 20, className, title }) {
  return (
    <span
      className={`logo ${className || ''}`}
      style={{ '--logo-size': `${size}px` }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <img className="logo__img logo__img--brand" src="/images/logo-fzn.png" alt="" aria-hidden="true" />
      <img className="logo__img logo__img--light" src="/images/logo-fzn-light.png" alt="" aria-hidden="true" />
    </span>
  );
}

export default LogoMark;
