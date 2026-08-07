'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import { getDirectImageUrl } from '@/utils/imageHelper';
import ProjectIndex from './ProjectIndex';
import './Projects.css';

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 10 10 2M4.4 2H10v5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

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

/** "2024 · 3 people · 2 mo" */
function metaLine(p) {
  const team = p.teamSize > 1 ? `${p.teamSize} people` : 'Solo';
  return [p.year, team, p.duration].filter(Boolean).join(' · ');
}

/**
 * Word-by-word blur reveal for the active project's description.
 * Remounts on `resetKey` so switching projects replays it.
 */
function WordReveal({ text, resetKey, enabled }) {
  if (!enabled) return <p className="pj__desc">{text}</p>;

  const words = String(text || '').split(' ');
  return (
    <p className="pj__desc" key={resetKey}>
      {words.map((w, i) => (
        <span key={i} className="pj__word" style={{ transitionDelay: `${(i * 0.024).toFixed(3)}s` }}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}

export default function Projects({ projects = [], projectCategories = [], projectsContent = {} }) {
  const rootRef = useRef(null);
  const stackRef = useRef(null);
  const reduced = useReducedMotion();

  useReveal(rootRef, { enabled: !reduced });

  const [filter, setFilter] = useState('All');
  const [index, setIndex] = useState(0);
  const [gap, setGap] = useState(60);

  // The sheet stores Drive *share* links, which serve an HTML page rather than
  // an image — rewrite them to the thumbnail endpoint before rendering.
  const resolved = useMemo(
    () => projects.map((p) => ({ ...p, image: getDirectImageUrl(p.image) })),
    [projects],
  );

  const visible = useMemo(
    () => (filter === 'All' ? resolved : resolved.filter((p) => p.category === filter)),
    [resolved, filter],
  );

  // Only offer filters that actually match something.
  const filters = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    const rest = (projectCategories.length
      ? projectCategories.filter((c) => c !== 'All')
      : [...present]
    ).filter((c) => present.has(c));
    return ['All', ...rest];
  }, [projects, projectCategories]);

  const total = visible.length;
  const active = visible[index];

  useEffect(() => setIndex(0), [filter]);

  const move = useCallback(
    (delta) => {
      if (total < 2) return;
      setIndex((prev) => ((prev + delta) % total + total) % total);
    },
    [total],
  );

  // Neighbour offset tracks the stack width.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const measure = () => {
      const w = stack.offsetWidth || 480;
      setGap(Math.max(32, Math.min(88, w * 0.15)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stack);
    return () => ro.disconnect();
  }, []);

  // Arrow keys drive the stack while it is on screen.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const stack = stackRef.current;
      if (!stack) return;
      const r = stack.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15;
      if (!inView) return;
      move(e.key === 'ArrowRight' ? 1 : -1);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  if (!projects.length) return null;

  const up = (gap * 0.62).toFixed(1);

  // Sheet copy does not always end in punctuation; the hint that follows needs it to.
  const rawLead =
    projectsContent.subtitle || 'Showcasing latest work in data science and machine learning';
  const lead = /[.!?]$/.test(rawLead.trim()) ? rawLead.trim() : `${rawLead.trim()}.`;

  // Past a dozen entries the dot rail stops being a usable control and just
  // becomes noise — the counter and arrows carry navigation instead.
  const showDots = total <= 12;

  /** Front card centred; immediate neighbours fan out, everything else parks behind. */
  const cardStyle = (i) => {
    const isActive = i === index;
    const isLeft = total > 1 && (index - 1 + total) % total === i;
    const isRight = total > 2 && (index + 1) % total === i;

    if (isActive) {
      return { transform: 'translate3d(0,0,0) scale(1)', zIndex: 3, opacity: 1, pointerEvents: 'auto' };
    }
    if (isLeft || isRight) {
      const dir = isLeft ? '-' : '';
      const rot = isLeft ? 15 : -15;
      return {
        transform: `translate3d(${dir}${gap.toFixed(1)}px,-${up}px,0) scale(.85) rotateY(${rot}deg)`,
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        filter: 'saturate(.9) brightness(.95)',
      };
    }
    return {
      transform: `translate3d(0,-${up}px,0) scale(.78)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
    };
  };

  return (
    <section id="projects" ref={rootRef} className="section section--clip">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">05</span>
          <h2 className="section-title">{projectsContent.featuredTitle || 'Featured Projects'}</h2>
        </div>
        <p className="section-lead pj__lead" data-reveal="" data-d="60">
          {lead} Klik kartu samping untuk berpindah, panah kiri-kanan untuk navigasi.
        </p>

        <div className="pj__filters" data-reveal="" data-d="100" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className="pj__filter"
              data-on={filter === f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {total === 0 ? (
          <p className="pj__empty mono">{projectsContent.noProjects || 'No projects found.'}</p>
        ) : (
          <div className="pj__layout">
            {/* ---------- card stack ---------- */}
            <div className="pj__stack-col">
              <div ref={stackRef} className="pj__stack">
                {visible.map((p, i) => (
                  <button
                    key={p.id ?? p.title}
                    type="button"
                    className="pj__card"
                    style={cardStyle(i)}
                    onClick={() => (i === index ? move(1) : setIndex(i))}
                    aria-label={p.title}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    {p.image ? (
                      // Drive refuses to serve thumbnails when a Referer header
                      // identifies another origin, so suppress it.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="pj__card-img"
                      />
                    ) : (
                      <span className="pj__card-fallback mono">{p.title}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ---------- detail ---------- */}
            <div className="pj__detail-col">
              <div className="pj__detail" key={active.id ?? index}>
                <div className="pj__detail-meta">
                  <span className="pj__category mono">{active.category}</span>
                  <span className="pj__meta mono">{metaLine(active)}</span>
                </div>

                <h3 className="pj__title">{active.title}</h3>

                <WordReveal
                  text={active.description}
                  resetKey={active.id ?? index}
                  enabled={!reduced}
                />

                {Array.isArray(active.technologies) && active.technologies.length > 0 && (
                  <div className="tag-row">
                    {active.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pj__links">
                  {active.githubUrl && (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-peek={active.githubUrl}
                      className="pj__link"
                    >
                      Code
                      <ExternalIcon />
                    </a>
                  )}
                  {active.demoUrl && (
                    <a
                      href={active.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-peek={active.demoUrl}
                      className="pj__link"
                    >
                      Live demo
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              {/* ---------- pager ---------- */}
              <div className="pj__pager">
                <div className="pj__count">
                  <span className="pj__count-now mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="pj__count-total mono">/ {String(total).padStart(2, '0')}</span>
                </div>

                {showDots ? (
                  <div className="pj__dots">
                    {visible.map((p, i) => (
                      <button
                        key={p.id ?? p.title}
                        type="button"
                        className="dot pj__dot"
                        data-on={i === index}
                        onClick={() => setIndex(i)}
                        aria-label={p.title}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="pj__rail" aria-hidden="true">
                    <span
                      className="pj__rail-fill"
                      style={{ transform: `scaleX(${(index + 1) / total})` }}
                    />
                  </div>
                )}

                <div className="pj__arrows">
                  <button type="button" className="icon-btn" onClick={() => move(-1)} aria-label="Previous project">
                    <ChevronLeft />
                  </button>
                  <button type="button" className="icon-btn" onClick={() => move(1)} aria-label="Next project">
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* The stack shows one project's prose at a time. This lists all of
            them, which is both better for browsing 23 entries and the only
            way the descriptions reach the HTML at all — see GEO-ANALYSIS.md §7.
            It follows the same filter as the stack so the two never disagree. */}
        <ProjectIndex projects={visible} />

        <div className="pj__all">
          <a
            href="https://github.com/Fauzan-A25?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            data-peek="https://github.com/Fauzan-A25?tab=repositories"
            className="btn"
          >
            <span>All repositories on GitHub</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 11 11 2M4.6 2H11v6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
