'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './LinkPeek.css';

const W = 270;
const H = 177;
const LENS = 96;

function microlink(url, theme) {
  const q = [
    `url=${encodeURIComponent(url)}`,
    'screenshot=true',
    'meta=false',
    'embed=screenshot.url',
    `colorScheme=${theme === 'light' ? 'light' : 'dark'}`,
    'viewport.isMobile=true',
    'viewport.deviceScaleFactor=1',
    'viewport.width=660',
    'viewport.height=412',
  ].join('&');
  return `https://api.microlink.io/?${q}`;
}

/**
 * Hover preview for any `[data-peek="<url>"]` anchor on the page.
 *
 * Uses delegated pointer events rather than binding to a snapshot of the DOM,
 * so links that mount later — project details, filtered cards — work too.
 * Pointer-only by design: it is decoration, and every peeked link is already
 * reachable and labelled on its own.
 */
export default function LinkPeek() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();

  const [state, setState] = useState({ url: null, x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);

  const openTimer = useRef(null);
  const hideTimer = useRef(null);
  const lensRef = useRef(null);
  const lensImgRef = useRef(null);
  const imgRef = useRef(null);

  const clearTimers = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const onOver = (e) => {
      const link = e.target.closest?.('[data-peek]');
      if (!link) return;

      const url = link.getAttribute('data-peek');
      if (!url) return;

      clearTimers();
      openTimer.current = setTimeout(() => {
        const r = link.getBoundingClientRect();
        let x = r.left + r.width / 2 - W / 2;
        x = Math.max(10, Math.min(window.innerWidth - W - 10, x));
        let y = r.top - H - 14;
        if (y < 66) y = r.bottom + 14;

        setState((prev) => {
          if (prev.url !== url) setLoaded(false);
          return { url, x, y };
        });
      }, 110);
    };

    const onOut = (e) => {
      if (!e.target.closest?.('[data-peek]')) return;
      clearTimeout(openTimer.current);
      hideTimer.current = setTimeout(() => setState((p) => ({ ...p, url: null })), 180);
    };

    const onScroll = () => setState((p) => (p.url ? { ...p, url: null } : p));

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('scroll', onScroll);
      clearTimers();
    };
  }, [clearTimers]);

  // Magnifier that follows the cursor across the preview thumbnail.
  const onMove = (e) => {
    if (reduced || !imgRef.current || !lensRef.current || !lensImgRef.current) return;
    const box = imgRef.current.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const mask = `radial-gradient(circle ${LENS / 2}px at ${x}px ${y}px, #000 ${LENS / 2}px, transparent ${LENS / 2}px)`;
    lensRef.current.style.maskImage = mask;
    lensRef.current.style.webkitMaskImage = mask;
    lensImgRef.current.style.transformOrigin = `${x}px ${y}px`;
  };

  const { url, x, y } = state;
  const src = url ? microlink(url, theme) : null;
  const label = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  return (
    <div
      className="peek"
      data-open={url ? 'true' : 'false'}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden="true"
      onMouseEnter={() => {
        clearTimers();
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setState((p) => ({ ...p, url: null }));
      }}
      onMouseMove={onMove}
    >
      <div className="peek__frame">
        {!loaded && <div className="peek__skeleton" />}
        {src && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt=""
              className="peek__img"
              data-loaded={loaded ? 'true' : 'false'}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
            <div ref={lensRef} className="peek__lens" data-on={hovering && !reduced}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={lensImgRef} src={src} alt="" className="peek__lens-img" />
            </div>
          </>
        )}
        <span className="peek__label mono">{label}</span>
      </div>
    </div>
  );
}
