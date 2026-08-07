'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import './Experience.css';

/** Internship / part-time roles get the accent badge; the rest stay muted. */
const ACCENT_TYPES = new Set(['internship', 'part-time', 'parttime', 'full-time']);

export default function Experience({ experiences = [] }) {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const reduced = useReducedMotion();

  useReveal(rootRef, { enabled: !reduced });

  const [open, setOpen] = useState(() => new Set());
  const [progress, setProgress] = useState(0);

  // The accent line fills as the timeline passes the reading line.
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.62 - r.top) / Math.max(1, r.height);
      setProgress(Math.min(1, Math.max(0, p)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (!experiences.length) return null;

  return (
    <section id="experience" ref={rootRef} className="section section--clip">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">03</span>
          <h2 className="section-title">Experience</h2>
        </div>
        <p className="section-lead xp__lead" data-reveal="" data-d="60">
          Klik satu baris untuk melihat detail tanggung jawab.
        </p>

        <div ref={timelineRef} className="xp__timeline">
          <div className="xp__rail" aria-hidden="true" />
          <div
            className="xp__rail-fill"
            aria-hidden="true"
            style={{ transform: `scaleY(${progress})` }}
          />

          {experiences.map((exp, i) => {
            const id = exp.id ?? i;
            const isOpen = open.has(id);
            const accent = ACCENT_TYPES.has(String(exp.type || '').toLowerCase());
            const bodyId = `xp-body-${id}`;
            const meta = [exp.location, exp.duration].filter(Boolean).join(' · ');

            return (
              <div key={id} className="xp__item" data-reveal="" data-d={i * 30}>
                <span className="xp__node" data-on={isOpen} aria-hidden="true" />

                <button
                  type="button"
                  className="xp__head"
                  onClick={() => toggle(id)}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                >
                  <span className="xp__title">{exp.title}</span>
                  <span className="xp__period mono">{exp.period}</span>
                  {exp.type && (
                    <span className={`badge${accent ? ' badge--acc' : ''}`}>{exp.type}</span>
                  )}
                  <span className="xp__chevron" data-on={isOpen} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 4.5 6 8.5l4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div id={bodyId} className="xp__body" data-open={isOpen} role="region">
                  <div className="xp__body-inner">
                    <div className="xp__meta">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-peek={exp.companyUrl}
                          className="xp__company xp__company--link"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span className="xp__company">{exp.company}</span>
                      )}
                      {meta && <span className="xp__meta-rest mono">{` · ${meta}`}</span>}
                    </div>

                    {exp.description && <p className="xp__desc">{exp.description}</p>}

                    {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                      <ul className="xp__list">
                        {exp.responsibilities.map((r, j) => (
                          <li key={j}>{r}</li>
                        ))}
                      </ul>
                    )}

                    {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                      <div className="tag-row">
                        {exp.technologies.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
