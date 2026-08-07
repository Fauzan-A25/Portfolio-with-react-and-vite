'use client';

import './ProjectIndex.css';

/**
 * The crawlable half of the Projects section.
 *
 * The card stack renders exactly one project's prose at a time, which is right
 * for browsing and wrong for everything else: 22 of 23 descriptions never
 * reached the HTML, so ~18 KB of the most quotable text on this site — the
 * accuracy figures, the dataset sizes — was invisible to search and to every
 * AI crawler. See GEO-ANALYSIS.md §7.
 *
 * This renders all of them. Built on native <details>, so the full text is in
 * the static HTML with no JavaScript involved, and the browser handles the
 * expand/collapse, keyboard access and find-in-page for free.
 *
 * Note this is *not* hidden text: it is user-facing content behind a normal
 * disclosure control, which is the same pattern as any FAQ accordion. Nothing
 * here is written for crawlers that a reader would not also want.
 */

const Chevron = () => (
  <svg className="px__chev" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="m3 5.5 4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 10 10 2M4.4 2H10v5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Sheet-era prose keeps its paragraph breaks; render them as paragraphs. */
function paragraphs(text) {
  return String(text || '')
    .split(/\n\s*\n|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** "Machine Learning · 2024 · Full Stack Developer · 2 months" */
function metaOf(p) {
  return [p.category, p.year, p.role, p.duration].filter(Boolean).join(' · ');
}

export default function ProjectIndex({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section className="px" aria-labelledby="project-index-heading" data-reveal="">
      <div className="px__head">
        <h3 id="project-index-heading" className="px__heading">
          Full project index
        </h3>
        <p className="px__note">
          Every project with its full write-up, results and stack. Expand any row to read it.
        </p>
      </div>

      <ol className="px__list">
        {projects.map((p, i) => {
          const body = paragraphs(p.description);
          const highlights = Array.isArray(p.highlights) ? p.highlights.filter(Boolean) : [];
          const tech = Array.isArray(p.technologies) ? p.technologies.filter(Boolean) : [];

          return (
            <li key={p.id ?? p.title} className="px__item">
              <details className="px__entry">
                <summary className="px__summary">
                  <span className="px__num mono" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h4 className="px__title">{p.title}</h4>

                  <span className="px__short">{p.shortDescription}</span>
                  <span className="px__meta mono">{metaOf(p)}</span>

                  <Chevron />
                </summary>

                <div className="px__body">
                  {body.map((para, n) => (
                    <p key={n} className="px__para">
                      {para}
                    </p>
                  ))}

                  {highlights.length > 0 && (
                    <>
                      <h5 className="px__sub">Results</h5>
                      <ul className="px__highlights">
                        {highlights.map((h, n) => (
                          <li key={n}>{h}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="px__foot">
                    {tech.length > 0 && (
                      <div className="px__tech">
                        {tech.map((t) => (
                          <span key={t} className="px__tag mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {(p.githubUrl || p.demoUrl) && (
                      <div className="px__links">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px__link"
                          >
                            Code
                            <ExternalIcon />
                          </a>
                        )}
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px__link"
                          >
                            Live demo
                            <ExternalIcon />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
