'use client';

import { useMemo, useRef } from 'react';
import { useProof } from '@/components/ui/ProofModal/ProofModal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import './Certifications.css';

// Competition certificates rarely say "competition" — they carry the event's
// name instead, so match the events too.
const COMPETITION = /competition|kompetisi|lomba|contest|compfest|competitive|gelar\s*rasa|find\s*it/i;

/** Builds the "N sertifikat / N dengan dokumen / N kompetisi" summary row. */
function summarize(items) {
  return [
    { value: items.length, label: 'Sertifikat' },
    { value: items.filter((c) => c.proofKey).length, label: 'Dengan dokumen' },
    {
      value: items.filter((c) => COMPETITION.test(`${c.name} ${c.issuer}`)).length,
      label: 'Kompetisi',
    },
  ];
}

export default function Certifications({ certifications = [] }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const { openProof, proofs } = useProof();

  useReveal(rootRef, { enabled: !reduced });

  // Documented certificates first — the page leads with what it can prove.
  const items = useMemo(() => {
    const withDoc = certifications.filter((c) => c.proofKey && proofs[c.proofKey]);
    const without = certifications.filter((c) => !c.proofKey || !proofs[c.proofKey]);
    return [...withDoc, ...without];
  }, [certifications, proofs]);

  const stats = useMemo(() => summarize(items), [items]);

  if (!items.length) return null;

  return (
    <section id="certifications" ref={rootRef} className="section section--raised">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">04</span>
          <h2 className="section-title">Certifications</h2>
        </div>
        <p className="section-lead cert__lead" data-reveal="" data-d="50">
          Dokumen asli, bukan klaim. Klik salah satu untuk melihat versi penuh beserta nomor
          sertifikatnya.
        </p>

        <div className="cert__stats" data-reveal="" data-d="80">
          {stats.map((s) => (
            <div key={s.label} className="cert__stat">
              <span className="cert__stat-value">{s.value}</span>
              <span className="cert__stat-label mono">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="cert__grid">
          {items.map((c, i) => {
            const proof = c.proofKey ? proofs[c.proofKey] : null;
            const caption = [c.issuer, c.role, c.credentialId && `No. ${c.credentialId}`]
              .filter((v) => v && v !== 'N/A')
              .join(' · ');

            if (!proof) {
              return (
                <div
                  key={c.id ?? c.name}
                  className="cert__card cert__card--empty"
                  data-reveal=""
                  data-d={i * 55}
                >
                  <span className="cert__empty-mark mono">—</span>
                  <span className="cert__title">{c.name}</span>
                  <span className="cert__caption mono">
                    {caption || c.issuer} · dokumen belum diunggah
                  </span>
                </div>
              );
            }

            return (
              <button
                key={c.id ?? c.name}
                type="button"
                className="cert__card"
                data-reveal=""
                data-d={i * 55}
                onClick={() => openProof(c.proofKey)}
                aria-label={`Lihat sertifikat ${c.name}`}
              >
                <span className="cert__thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={proof.image} alt="" loading="lazy" className="cert__img" />
                  {c.date && c.date !== 'N/A' && (
                    <span className="cert__year mono">{String(c.date).slice(-4)}</span>
                  )}
                </span>
                <span className="cert__meta">
                  <span className="cert__title">{c.name}</span>
                  <span className="cert__caption mono">{caption}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
