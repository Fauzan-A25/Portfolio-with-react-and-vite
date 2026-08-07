'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import MusicPlayer from '@/components/BackgroundMusic/MusicPlayer';
import { scrollToSection } from '@/components/layout/Navbar/Navbar';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import './Hero.css';

/**
 * The hero is composed on a 1180x706 art board: every block is placed by
 * fraction-of-width (x/w) and art-board pixels (y), then scaled by `--k`.
 * Below 960px the whole thing collapses to a plain vertical stack.
 */
const ART_W = 1180;
const ART_H = 706;
const WIDE_AT = 960;

const PLACEMENT = {
  name: { x: 0, w: 0.44, y: 348, px: 15 },
  photo: { x: 0.34, w: 0.33, y: 10, px: 6 },
  info: { x: 0, w: 0.285, y: 62, px: 26 },
  cta: { x: 0, w: 0.42, y: 608, px: 11 },
  player: { x: 0.694, w: 0.306, y: 452, px: 30 },
};

const DECOR = {
  a: { x: 0.215, w: 0.155, y: 20, h: 134 },
  b: { x: 0.585, w: 0.13, y: 132, h: 76 },
  c: { x: 0.25, w: 0.085, y: 336, h: 196 },
  v: { x: 0.885, w: 0, y: 48, h: 0 },
};

const vars = (spec) => ({
  '--x': spec.x,
  '--w': spec.w,
  '--y': spec.y,
  '--h': spec.h ?? 0,
  '--px': spec.px ?? 0,
});

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 11 11 2M4.6 2H11v6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function Hero({ personalInfo = {}, socialLinks = {}, heroTypingTexts = [] }) {
  const reduced = useReducedMotion();
  const typed = useTypingEffect(heroTypingTexts, { reduced });

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const nameRef = useRef(null);

  const [wide, setWide] = useState(false);
  const [k, setK] = useState(1);
  const [ctaTop, setCtaTop] = useState(PLACEMENT.cta.y);
  const [stageH, setStageH] = useState(ART_H);
  const [docked, setDocked] = useState(false);
  const [ready, setReady] = useState(false);

  // Measure the stage and re-derive the art-board scale.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const W = stage.clientWidth || ART_W;
      const isWide = W >= WIDE_AT;
      const scale = W / ART_W;

      setWide(isWide);
      setK(scale);

      if (!isWide) {
        setStageH(0);
        return;
      }

      // The CTA sits under the name, whose height depends on how the title wraps.
      const nameH = nameRef.current?.offsetHeight ?? 0;
      const top = Math.round(PLACEMENT.name.y * scale + nameH + 26 * scale);
      setCtaTop(top);

      const ctaH = stage.querySelector('[data-hero="cta"]')?.offsetHeight ?? 0;
      setStageH(Math.max(Math.round(ART_H * scale), top + ctaH + Math.round(24 * scale)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [typed]);

  // Reveal the composed blocks once, staggered.
  useEffect(() => {
    const id = setTimeout(() => setReady(true), reduced ? 0 : 700);
    return () => clearTimeout(id);
  }, [reduced]);

  // Dock the player when the hero leaves the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => setDocked(section.getBoundingClientRect().bottom < 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pointer parallax, throttled to one frame.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !wide || reduced || !ready) return;

    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = stage.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        stage.style.setProperty('--dx', dx.toFixed(3));
        stage.style.setProperty('--dy', dy.toFixed(3));
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      stage.style.removeProperty('--dx');
      stage.style.removeProperty('--dy');
    };
  }, [wide, reduced, ready]);

  const onNav = useCallback(
    (e, id) => {
      e.preventDefault();
      scrollToSection(id, reduced);
    },
    [reduced],
  );

  const photoSrc = personalInfo.profileImage || '/images/Fauzan-slice.png';
  const photoName = photoSrc.split('/').pop();

  const socials = [
    ['GitHub', socialLinks.github],
    ['LinkedIn', socialLinks.linkedin],
    ['Instagram', socialLinks.instagram],
  ].filter(([, href]) => Boolean(href));

  return (
    <section id="home" ref={sectionRef} className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner">
        <div
          ref={stageRef}
          className="hero__stage"
          data-wide={wide}
          data-ready={ready}
          style={{ '--k': k, height: wide && stageH ? `${stageH}px` : undefined }}
        >
          {/* --- decorative plates, wide layout only --- */}
          <div className="hero__deco hero__deco--a" style={vars(DECOR.a)} aria-hidden="true" />
          <div className="hero__deco hero__deco--b" style={vars(DECOR.b)} aria-hidden="true" />
          <div className="hero__deco hero__deco--c" style={vars(DECOR.c)} aria-hidden="true" />
          <div className="hero__deco hero__deco--v mono" style={vars(DECOR.v)} aria-hidden="true">
            Data Science · Portfolio 2026
          </div>

          {/* --- name + typed role --- */}
          <div
            ref={nameRef}
            className="hero__block hero__name"
            data-hero="name"
            style={vars(PLACEMENT.name)}
          >
            <div className="hero__kicker">
              <span className="hero__rule" aria-hidden="true" />
              <span className="hero__kicker-text mono">
                Data Science · {personalInfo.university || 'Telkom University'}
              </span>
            </div>

            <h1 className="hero__title">{personalInfo.name || 'Fauzan Ahsanudin Alfikri'}</h1>

            <div className="hero__typed mono">
              <span className="hero__caret-mark" aria-hidden="true">
                &gt;
              </span>
              <span>{typed}</span>
              <span className="hero__caret" aria-hidden="true" />
            </div>
          </div>

          {/* --- portrait --- */}
          <div className="hero__block hero__photo" data-hero="photo" style={vars(PLACEMENT.photo)}>
            <div className="hero__photo-frame">
              <div className="hero__photo-border" aria-hidden="true" />
              {['tl', 'tr', 'bl', 'br'].map((corner) => (
                <span key={corner} className={`hero__corner hero__corner--${corner}`} aria-hidden="true" />
              ))}
              <span className="hero__photo-tag mono">{photoName}</span>
              <div className="hero__photo-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoSrc} alt={personalInfo.name || 'Portrait'} className="hero__photo-img" />
              </div>
            </div>
          </div>

          {/* --- information card --- */}
          <div className="hero__block hero__info" data-hero="info" style={vars(PLACEMENT.info)}>
            <div className="hero__info-card">
              <div className="hero__info-head">
                <span className="hero__info-icon mono" aria-hidden="true">
                  i
                </span>
                <span className="eyebrow">Information</span>
              </div>
              {[
                ['Studying at', personalInfo.university || 'Telkom University'],
                ['Based in', personalInfo.location || 'Bandung, Indonesia'],
                ['Focus', personalInfo.focus || 'NLP · Computer Vision · ML Pipelines'],
              ].map(([label, value]) => (
                <div key={label} className="hero__info-row">
                  <span className="hero__info-label mono">{label}</span>
                  <span className="hero__info-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- calls to action --- */}
          <div className="hero__block hero__cta" data-hero="cta" style={vars(PLACEMENT.cta)}>
            <div className="hero__cta-row">
              {personalInfo.cvLink && (
                <a
                  href={personalInfo.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-peek={personalInfo.cvLink}
                  className="btn btn--primary"
                >
                  <span>Download CV</span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path
                      d="M6.5 1v9M2.8 6.6 6.5 10.3l3.7-3.7M1.5 12h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              )}
              <a href="#contact" className="btn" onClick={(e) => onNav(e, 'contact')}>
                <span>Get in touch</span>
                <ArrowIcon />
              </a>
            </div>

            {socials.length > 0 && (
              <div className="hero__social">
                <span className="hero__social-label mono">Elsewhere</span>
                <div className="hero__social-links">
                  {socials.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-peek={href}
                      className="pill"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- ambient player --- */}
          <div
            className="hero__block hero__player"
            data-hero="player"
            data-docked={docked}
            style={vars(PLACEMENT.player)}
          >
            <MusicPlayer src="/audio/teman-ryo.mp3" title="teman-ryo" docked={docked} />
          </div>
        </div>
      </div>
    </section>
  );
}
