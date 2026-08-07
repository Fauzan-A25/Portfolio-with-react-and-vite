'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.pageYOffset > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      className="to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path
          d="M7.5 12.5V3M3.4 7.1 7.5 3l4.1 4.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
