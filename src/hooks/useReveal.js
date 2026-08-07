'use client';

import { useEffect } from 'react';

/**
 * Reveal-on-scroll for every `[data-reveal]` inside `rootRef`.
 *
 * Elements are only hidden once this effect runs, so content stays visible if
 * JS never executes. Anything already near the viewport on mount is shown
 * immediately rather than fading in under the user's cursor.
 */
export function useReveal(rootRef, { enabled = true } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    if (!enabled || typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.setAttribute('data-reveal', 'shown'));
      return;
    }

    const show = (el) => {
      const delay = parseInt(el.getAttribute('data-d') || '0', 10);
      el.style.transitionDelay = `${delay}ms`;
      el.setAttribute('data-reveal', 'shown');
    };

    const pending = [];
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.setAttribute('data-reveal', 'shown');
      } else {
        el.setAttribute('data-reveal', 'hidden');
        pending.push(el);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    pending.forEach((el) => io.observe(el));

    // Safety net: never leave content permanently invisible if the observer
    // misses an element (e.g. a container that never scrolls).
    const failsafe = setTimeout(() => pending.forEach(show), 2600);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, [rootRef, enabled]);
}

/**
 * Counts a `[data-count]` element up to its target when it scrolls into view.
 * Preserves a trailing "+" if the initial text had one.
 */
export function useCounters(rootRef, { enabled = true } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const counters = Array.from(root.querySelectorAll('[data-count]'));
    if (!counters.length) return;

    const paint = (el, value) => {
      const suffix = el.dataset.suffix ?? '';
      el.textContent = `${value}${suffix}`;
    };

    counters.forEach((el) => {
      if (el.dataset.suffix === undefined) {
        el.dataset.suffix = (el.textContent || '').includes('+') ? '+' : '';
      }
    });

    if (!enabled || typeof IntersectionObserver === 'undefined') {
      counters.forEach((el) => paint(el, parseInt(el.getAttribute('data-count'), 10) || 0));
      return;
    }

    const frames = new Set();

    const run = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const duration = 900;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        paint(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frames.add(requestAnimationFrame(step));
      };
      frames.add(requestAnimationFrame(step));
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );

    counters.forEach((el) => io.observe(el));

    return () => {
      frames.forEach(cancelAnimationFrame);
      io.disconnect();
    };
  }, [rootRef, enabled]);
}
