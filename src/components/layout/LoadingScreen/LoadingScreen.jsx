'use client';

import './LoadingScreen.css';

/**
 * Full-page state shown while the portfolio content is fetched.
 * `error` switches it from "loading" to a retryable failure message.
 */
export default function LoadingScreen({ error = null }) {
  return (
    <div className="ls" role="status" aria-live="polite">
      <div className="ls__inner">
        {error ? (
          <>
            <span className="ls__eyebrow mono">Error</span>
            <h2 className="ls__title">Something went wrong</h2>
            <p className="ls__text">
              The portfolio content could not be loaded right now. Please check your connection or
              try again in a moment.
            </p>
            <p className="ls__detail mono">{error}</p>
            <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
              Try again
            </button>
          </>
        ) : (
          <>
            <span className="ls__spinner" aria-hidden="true" />
            <span className="ls__eyebrow mono">Loading</span>
            <h2 className="ls__title">Preparing portfolio…</h2>
            <p className="ls__text">Loading content and projects. This will only take a moment.</p>
          </>
        )}
      </div>
    </div>
  );
}
