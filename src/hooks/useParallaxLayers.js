'use client';

import { useEffect } from 'react';

/**
 * Drives a gentle scroll parallax on every `[data-depth]` decoration inside
 * rootRef — the same depth vocabulary as Hero's deco plates, extended to
 * other sections. Only `transform`, only while the element is in view, and
 * it never touches `[data-reveal]` content.
 */
export function useParallaxLayers(rootRef, { enabled = true } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled || typeof IntersectionObserver === 'undefined') return undefined;

    const layers = Array.from(root.querySelectorAll('[data-depth]'));
    if (!layers.length) return undefined;

    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
    });
    layers.forEach((el) => io.observe(el));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        visible.forEach((el) => {
          const depth = parseFloat(el.getAttribute('data-depth')) || 0;
          const r = el.getBoundingClientRect();
          const centerOffset = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.transform = `translateY(${(-centerOffset * depth * 0.06).toFixed(1)}px)`;
        });
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [rootRef, enabled]);
}
