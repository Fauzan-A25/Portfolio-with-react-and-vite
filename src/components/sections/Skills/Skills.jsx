'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import './Skills.css';

const ORDER = ['programming', 'dataScience', 'tools', 'soft'];

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function years(n) {
  const v = Number(n) || 0;
  return `${v} ${v === 1 ? 'yr' : 'yrs'}`;
}

export default function Skills({ skills = {}, skillsContent = {} }) {
  const rootRef = useRef(null);
  const orbitRef = useRef(null);
  const modalCloseRef = useRef(null);
  const reduced = useReducedMotion();

  useReveal(rootRef, { enabled: !reduced });

  const [cat, setCat] = useState(0);
  const [modal, setModal] = useState(false);
  const [radius, setRadius] = useState({ rx: 180, ry: 88 });

  const titles = skillsContent.categoryTitles || {};

  // Build the category list from whatever the sheet actually returned.
  const categories = useMemo(() => {
    const keys = ORDER.filter((k) => Array.isArray(skills[k]) && skills[k].length);
    const extra = Object.keys(skills).filter(
      (k) => !ORDER.includes(k) && Array.isArray(skills[k]) && skills[k].length,
    );
    return [...keys, ...extra].map((key) => ({
      key,
      title: titles[key] || key,
      items: skills[key],
    }));
  }, [skills, titles]);

  const total = categories.length;
  const totalSkills = useMemo(
    () => categories.reduce((sum, c) => sum + c.items.length, 0),
    [categories],
  );

  const move = useCallback(
    (delta) => {
      if (!total) return;
      setCat((prev) => ((prev + delta) % total + total) % total);
    },
    [total],
  );

  // Ellipse radii follow the orbit's rendered width.
  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const measure = () => {
      const w = orbit.clientWidth || 700;
      setRadius({ rx: Math.max(70, Math.min(210, w * 0.29)), ry: w < 520 ? 58 : 88 });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(orbit);
    return () => ro.disconnect();
  }, []);

  // Arrow keys drive the orbit while it is on screen — unless the modal owns them.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const orbit = orbitRef.current;
      if (!orbit) return;

      if (!modal) {
        const r = orbit.getBoundingClientRect();
        const inView = r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15;
        if (!inView) return;
      }
      move(e.key === 'ArrowRight' ? 1 : -1);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, modal]);

  // Modal focus + escape handling.
  useEffect(() => {
    if (!modal) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setModal(false);
    };
    window.addEventListener('keydown', onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalCloseRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [modal]);

  if (!total) return null;

  const active = categories[cat];

  // Sheet copy does not always end in punctuation; the hint that follows needs it to.
  const rawLead =
    skillsContent.subtitle ||
    'Technologies and tools I work with, measured by years of hands-on experience';
  const lead = /[.!?]$/.test(rawLead.trim()) ? rawLead.trim() : `${rawLead.trim()}.`;

  /** Places a card on the ellipse relative to the active index. */
  const placement = (idx) => {
    let off = idx - cat;
    if (off > total - 2) off -= total;
    if (off < -1) off += total;

    const a = off * (Math.PI / 2);
    const x = Math.sin(a) * radius.rx;
    const y = Math.cos(a) * radius.ry;
    const depth = (Math.cos(a) + 1) / 2;
    const isActive = off === 0;

    return {
      transform: `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.74 + depth * 0.26).toFixed(3)})`,
      opacity: isActive ? 1 : (0.3 + depth * 0.45).toFixed(2),
      zIndex: 10 + Math.round(depth * 10),
    };
  };

  return (
    <section id="skills" ref={rootRef} className="section section--raised section--clip">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">02</span>
          <h2 className="section-title">{skillsContent.title || 'Skills & Expertise'}</h2>
        </div>
        <p className="section-lead" data-reveal="" data-d="60">
          {lead} Klik salah satu kategori di orbit untuk melihat rincian skill-nya.
        </p>

        {/* ---------- orbit ---------- */}
        <div ref={orbitRef} className="sk__orbit">
          <div className="sk__center" aria-hidden="true">
            <span className="sk__center-num">{String(cat + 1).padStart(2, '0')}</span>
            <span className="sk__center-of mono">OF {String(total).padStart(2, '0')}</span>
          </div>

          {categories.map((c, i) => (
            <button
              key={c.key}
              type="button"
              className="sk__card"
              data-on={i === cat}
              style={placement(i)}
              onClick={() => (i === cat ? setModal(true) : setCat(i))}
              aria-label={`${c.title}, ${c.items.length} skill`}
            >
              <span className="sk__card-count mono">{c.items.length} skills</span>
              <span className="sk__card-title">{c.title}</span>
              <span className="sk__card-preview mono">
                {c.items.slice(0, 3).map((s) => s.name).join(' · ')}
              </span>
            </button>
          ))}
        </div>

        {/* ---------- orbit controls ---------- */}
        <div className="sk__controls">
          <button type="button" className="icon-btn" onClick={() => move(-1)} aria-label="Previous category">
            <ChevronLeft />
          </button>

          <div className="dot-row">
            {categories.map((c, i) => (
              <button
                key={c.key}
                type="button"
                className="dot"
                data-on={i === cat}
                onClick={() => setCat(i)}
                aria-label={c.title}
              />
            ))}
          </div>

          <button type="button" className="icon-btn" onClick={() => move(1)} aria-label="Next category">
            <ChevronRight />
          </button>

          <button type="button" className="sk__detail-btn mono" onClick={() => setModal(true)}>
            <span>Lihat detail skill</span>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1.6 5h6.8M5.4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ---------- distribution ---------- */}
        <div className="sk__dist" data-reveal="" data-d="140">
          <div className="sk__dist-head">
            <span className="sk__dist-title mono">Distribusi {totalSkills} skill</span>
            <span className="sk__dist-title mono">{total} kategori</span>
          </div>

          <div className="sk__dist-bars">
            {categories.map((c, i) => (
              <button
                key={c.key}
                type="button"
                className="sk__dist-bar"
                data-on={i === cat}
                style={{ flex: c.items.length }}
                onClick={() => setCat(i)}
                aria-label={`${c.title}, ${c.items.length} skill`}
              />
            ))}
          </div>

          <div className="sk__dist-bars">
            {categories.map((c) => (
              <span key={c.key} className="sk__dist-label mono" style={{ flex: c.items.length }}>
                {c.title.split(' ')[0]} · {c.items.length}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- detail modal ---------- */}
      {modal && (
        <div
          className="sk__modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — detail skill`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(false);
          }}
        >
          <div className="sk__panel">
            <div className="sk__panel-head">
              <div className="sk__panel-heading">
                <span className="eyebrow">
                  {active.items.length} skills · kategori {String(cat + 1).padStart(2, '0')} dari{' '}
                  {String(total).padStart(2, '0')}
                </span>
                <span className="sk__panel-title">{active.title}</span>
              </div>
              <button
                ref={modalCloseRef}
                type="button"
                className="icon-btn icon-btn--sm"
                onClick={() => setModal(false)}
                aria-label="Tutup detail skill"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="sk__panel-body">
              <h3 className="sk__panel-sub mono">{active.title}</h3>
              <div className="sk__list">
                {active.items.map((s) => (
                  <div key={s.name} className="sk__item" title={s.description || undefined}>
                    <span className="sk__item-name">{s.name}</span>
                    <span className="sk__item-years mono">{years(s.yearsOfExperience)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sk__panel-foot">
              <button type="button" className="sk__nav-btn mono" onClick={() => move(-1)}>
                ← Sebelumnya
              </button>
              <button type="button" className="sk__nav-btn mono" onClick={() => move(1)}>
                Berikutnya →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
