'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Navbar.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SCROLL_OFFSET = 108;

/** Smooth-scrolls to a section, accounting for the fixed nav shell. */
export function scrollToSection(id, reduced) {
  const el = document.getElementById(id);
  if (!el) return;
  const pad = parseFloat(getComputedStyle(el).paddingTop) || 0;
  const top = el.getBoundingClientRect().top + window.pageYOffset + pad - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();

  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ width: 0, left: 0 });

  const trackRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.pageYOffset > 24);

      let current = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 140 && r.bottom > 140) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Measure after paint so the pill lands on the freshly-laid-out link.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const el = active ? track.querySelector(`[data-to="${active}"]`) : null;
      setPill(el ? { width: el.offsetWidth, left: el.offsetLeft } : { width: 0, left: 0 });
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const onNav = useCallback(
    (e, id) => {
      e.preventDefault();
      scrollToSection(id, reduced);
    },
    [reduced],
  );

  return (
    <nav className="nav" aria-label="Section navigation">
      <div className="nav__shell" data-scrolled={scrolled}>
        <a href="#home" className="nav__brand" onClick={(e) => onNav(e, 'home')}>
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__wordmark">FAA</span>
        </a>

        <div ref={trackRef} className="nav__track no-bar">
          <span
            className="nav__pill"
            aria-hidden="true"
            style={{
              width: `${pill.width}px`,
              transform: `translateX(${pill.left}px)`,
              opacity: pill.width ? 1 : 0,
            }}
          />
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-to={link.id}
              className="nav__link"
              data-on={active === link.id}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(e) => onNav(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="nav__theme mono"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          <span className="nav__theme-dot" data-light={theme === 'light'} aria-hidden="true" />
          <span>{theme.toUpperCase()}</span>
        </button>
      </div>
    </nav>
  );
}
