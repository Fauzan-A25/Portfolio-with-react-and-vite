'use client';

import { useCallback, useRef, useState } from 'react';
import { scrollToSection } from '@/components/layout/Navbar/Navbar';
import { useProof } from '@/components/ui/ProofModal/ProofModal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useCounters, useReveal } from '@/hooks/useReveal';
import './About.css';

/** Fills {university} style tokens in copy that comes from the sheet. */
function interpolate(text, values) {
  return String(text || '').replace(/\{(\w+)\}/g, (m, key) => values[key] ?? m);
}

const COLLAGE = [
  { key: 'adikara-photo', label: 'ADIKARA 2025', className: 'about__tile--a' },
  { key: 'teaching', label: 'Asisten dosen', className: 'about__tile--b' },
  { key: 'adikara-cert', label: 'Sertifikat', className: 'about__tile--c' },
];

export default function About({ personalInfo = {}, aboutContent = {}, stats = [] }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const { openProof, proofs } = useProof();

  // Tiles whose document has not been uploaded yet still hold their place in
  // the collage rather than collapsing it with a broken image.
  const [missing, setMissing] = useState(() => new Set());

  useReveal(rootRef, { enabled: !reduced });
  useCounters(rootRef, { enabled: !reduced });

  const onNav = useCallback(
    (e, id) => {
      e.preventDefault();
      scrollToSection(id, reduced);
    },
    [reduced],
  );

  const paragraphs = aboutContent.paragraphs || [];
  const highlights = aboutContent.highlights || [];

  return (
    <section id="about" ref={rootRef} className="section">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">01</span>
          <h2 className="section-title">About</h2>
        </div>

        <div className="about__grid">
          {/* ---------- proof collage ---------- */}
          <div className="about__media" data-reveal="" data-d="60">
            <div className="about__collage">
              <span className="about__blob about__blob--1" aria-hidden="true" />
              <span className="about__blob about__blob--2" aria-hidden="true" />
              <span className="about__blob about__blob--3" aria-hidden="true" />

              {COLLAGE.map((tile) => {
                const proof = proofs[tile.key];
                if (!proof) return null;
                const gone = missing.has(tile.key);

                return (
                  <button
                    key={tile.key}
                    type="button"
                    className={`about__tile ${tile.className}`}
                    data-missing={gone}
                    onClick={() => openProof(tile.key)}
                    aria-label={`Lihat ${proof.title}`}
                  >
                    {gone ? (
                      <span className="about__tile-placeholder" aria-hidden="true" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={proof.image}
                        alt=""
                        className="about__tile-img"
                        onError={() => setMissing((prev) => new Set(prev).add(tile.key))}
                      />
                    )}
                    <span className="about__tile-label mono">{tile.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------- copy ---------- */}
          <div className="about__body">
            {paragraphs.map((p, i) => (
              <p
                key={p.id ?? i}
                className="about__para"
                data-reveal=""
                data-d={90 + i * 40}
              >
                {interpolate(p.text ?? p, personalInfo)}
              </p>
            ))}

            {highlights.length > 0 && (
              <ul className="about__highlights" data-reveal="" data-d="170">
                {highlights.map((h, i) => (
                  <li key={h.id ?? i} className="about__highlight">
                    <span className="about__bullet" aria-hidden="true" />
                    <span className="about__highlight-text">{h.text}</span>

                    {h.proofKey && proofs[h.proofKey] && (
                      <button
                        type="button"
                        className="about__proof-btn mono"
                        onClick={() => openProof(h.proofKey)}
                      >
                        {h.proofLabel || 'Sertifikat'}
                      </button>
                    )}

                    {h.link && (
                      <a
                        href={`#${h.link}`}
                        className="about__proof-link mono"
                        onClick={(e) => onNav(e, h.link)}
                      >
                        {h.linkLabel || 'Lihat'} →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {stats.length > 0 && (
              <div className="about__stats" data-reveal="" data-d="210">
                {stats.map((s, i) => {
                  const value = String(s.value ?? '');
                  const target = parseInt(value, 10) || 0;
                  return (
                    <div key={s.label ?? i} className="about__stat">
                      <span className="about__stat-value" data-count={target}>
                        {value.includes('+') ? '0+' : '0'}
                      </span>
                      <span className="about__stat-label mono">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
