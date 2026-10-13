import './SectionDeco.css';

/**
 * Ambient background plates — the same thin-line rect/circle language as
 * Hero's `.hero__deco`, generalized so other sections read as part of the
 * same depth system instead of sitting flat. Purely decorative; pairs with
 * `useParallaxLayers` via the `data-depth` attribute.
 */
export default function SectionDeco({ variant = 'default' }) {
  return (
    <div className="deco" data-variant={variant} aria-hidden="true">
      <span className="deco__plate deco__plate--a" data-depth="0.6" />
      <span className="deco__plate deco__plate--b" data-depth="1.1" />
      <span className="deco__plate deco__plate--c" data-depth="0.4" />
    </div>
  );
}
