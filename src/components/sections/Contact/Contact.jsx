'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useReveal } from '@/hooks/useReveal';
import './Contact.css';

const IDLE = { state: 'idle', message: '' };

export default function Contact({
  personalInfo = {},
  socialLinks = {},
  contactContent = {},
  emailjsConfig = {},
}) {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const reduced = useReducedMotion();

  useReveal(rootRef, { enabled: !reduced });

  const [status, setStatus] = useState(IDLE);

  const copy = contactContent.form || {};
  const messages = contactContent.messages || {};
  const configured = Boolean(
    emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey,
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status.state === 'sending') return;

    if (!configured) {
      setStatus({
        state: 'error',
        message: 'Email service is not configured yet — please use the email address above.',
      });
      return;
    }

    setStatus({ state: 'sending', message: '' });

    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey,
      );
      setStatus({
        state: 'success',
        message: messages.success || 'Thank you! Your message has been sent successfully.',
      });
      formRef.current.reset();
    } catch (err) {
      console.error('[Contact] EmailJS error:', err);
      setStatus({
        state: 'error',
        message: messages.error || 'Something went wrong. Please try again or email me directly.',
      });
    }
  };

  const rows = [
    ['Email', <a key="e" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>],
    ['Location', <span key="l" className="ct__value">{personalInfo.location}</span>],
    [
      'Social',
      <span key="s" className="ct__socials">
        {socialLinks.github && (
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" data-peek={socialLinks.github}>
            GitHub
          </a>
        )}
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" data-peek={socialLinks.linkedin}>
            LinkedIn
          </a>
        )}
      </span>,
    ],
  ];

  return (
    <section id="contact" ref={rootRef} className="section section--raised section--clip">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-num mono">06</span>
          <h2 className="section-title">Get in touch</h2>
        </div>

        <div className="ct__grid">
          <div className="ct__aside">
            <p className="ct__intro" data-reveal="" data-d="60">
              {contactContent.leftSection?.description ||
                "Have a project in mind? Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities."}
            </p>

            <div className="ct__rows" data-reveal="" data-d="110">
              {rows.map(([label, value]) => (
                <div key={label} className="ct__row">
                  <span className="ct__label mono">{label}</span>
                  {value}
                </div>
              ))}
            </div>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="ct__form" data-reveal="" data-d="140">
            <div className="ct__pair">
              <label className="ct__field">
                <span className="ct__field-label mono">{copy.name?.label || 'Your name'}</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={copy.name?.placeholder || 'John Doe'}
                />
              </label>
              <label className="ct__field">
                <span className="ct__field-label mono">{copy.email?.label || 'Your email'}</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder={copy.email?.placeholder || 'john@example.com'}
                />
              </label>
            </div>

            <label className="ct__field">
              <span className="ct__field-label mono">{copy.subject?.label || 'Subject'}</span>
              <input
                type="text"
                name="subject"
                placeholder={copy.subject?.placeholder || 'Project Inquiry'}
              />
            </label>

            <label className="ct__field">
              <span className="ct__field-label mono">{copy.message?.label || 'Message'}</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder={copy.message?.placeholder || 'Tell me about your project...'}
              />
            </label>

            <button
              type="submit"
              className="btn btn--primary ct__submit"
              disabled={status.state === 'sending'}
            >
              {status.state === 'sending'
                ? copy.sending || 'Sending…'
                : copy.submit || 'Send message'}
            </button>

            <p className="ct__status mono" data-state={status.state} role="status" aria-live="polite">
              {status.message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
