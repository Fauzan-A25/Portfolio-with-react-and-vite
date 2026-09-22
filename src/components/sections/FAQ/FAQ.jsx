'use client';

import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import './FAQ.css';

/**
 * FAQ section. The question/answer pairs live in portfolio.json under
 * `faqContent` and are mirrored 1:1 by the FAQPage JSON-LD in src/lib/schema.js,
 * so answer engines can lift the same text a reader sees.
 */
export default function FAQ({ faqContent = {} }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  useReveal(rootRef, { enabled: !reduced });

  const questions = faqContent.questions || [];

  if (!questions.length) return null;

  return (
    <section id="faq" ref={rootRef} className="section">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">07</span>
          <h2 className="section-title">{faqContent.title || 'FAQ'}</h2>
        </div>

        {faqContent.subtitle && (
          <p className="section-lead faq__lead" data-reveal="" data-d="50">
            {faqContent.subtitle}
          </p>
        )}

        <div className="faq__list">
          {questions.map((q, i) => (
            <article className="faq__item" key={q.id ?? i} data-reveal="" data-d={60 + i * 20}>
              <h3 className="faq__q">{q.question}</h3>
              <p className="faq__a">{q.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
