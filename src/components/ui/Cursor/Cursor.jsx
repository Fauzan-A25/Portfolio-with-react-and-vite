'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Cursor.css';

const HOVER_SELECTOR =
  'a, button, [role="button"], .btn, .pill, .icon-btn, .dot, summary, [data-cursor-hover]';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';
const INTERACTIVE_SELECTOR = `${HOVER_SELECTOR}, ${TEXT_SELECTOR}, [data-peek]`;

const RING_LERP = 0.18;
const MAGNETIC_PULL = 0.4;

/**
 * Minimal ring+dot cursor with a magnetic snap on interactive elements.
 * Desktop/mouse only, and defers to LinkPeek's magnifier (see the
 * `data-peek-active` attribute LinkPeek sets on <html>) so the two never
 * overlap. See useReducedMotion for the accessibility gate.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const html = document.documentElement;
    html.dataset.cursor = 'custom';

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let target = null; // hovered element's center, while magnetic
    let hidden = false;
    let frame = 0;

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const onOver = (e) => {
      const textEl = e.target.closest?.(TEXT_SELECTOR);
      const peekEl = e.target.closest?.('[data-peek]');
      const hoverEl = e.target.closest?.(HOVER_SELECTOR);

      hidden = Boolean(textEl || peekEl);

      if (hoverEl && !hidden) {
        const r = hoverEl.getBoundingClientRect();
        target = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        ringRef.current?.classList.add('cursor__ring--active');
      } else {
        target = null;
        ringRef.current?.classList.remove('cursor__ring--active');
      }
    };

    const onOut = (e) => {
      if (!e.target.closest?.(INTERACTIVE_SELECTOR)) return;
      target = null;
      hidden = false;
      ringRef.current?.classList.remove('cursor__ring--active');
    };

    const tick = () => {
      const goalX = target ? pointer.x + (target.x - pointer.x) * MAGNETIC_PULL : pointer.x;
      const goalY = target ? pointer.y + (target.y - pointer.y) * MAGNETIC_PULL : pointer.y;
      ring.x += (goalX - ring.x) * RING_LERP;
      ring.y += (goalY - ring.y) * RING_LERP;

      const visible = !hidden && html.dataset.peekActive !== 'true';

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = visible ? '1' : '0';
      }
      if (ringRef.current) {
        const scale = target ? 1.7 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = visible ? '1' : '0';
      }

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      delete html.dataset.cursor;
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div ref={ringRef} className="cursor__ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor__dot" aria-hidden="true" />
    </>
  );
}
