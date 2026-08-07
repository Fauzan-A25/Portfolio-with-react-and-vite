'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import './ProofModal.css';

const ProofContext = createContext({ openProof: () => {}, proofs: {} });

/**
 * Holds the certificate/award lightbox. About and Certifications both trigger
 * it, so the modal lives once at the app root instead of in either section.
 */
export function ProofProvider({ proofs = {}, children }) {
  const [activeKey, setActiveKey] = useState(null);
  const [failed, setFailed] = useState(false);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);

  const openProof = useCallback((key) => {
    if (!key) return;
    restoreRef.current = document.activeElement;
    setFailed(false);
    setActiveKey(key);
  }, []);

  const closeProof = useCallback(() => {
    setActiveKey(null);
    // Send focus back to whatever opened the modal.
    if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
  }, []);

  useEffect(() => {
    if (!activeKey) return;

    const onKey = (e) => {
      if (e.key === 'Escape') closeProof();
    };
    window.addEventListener('keydown', onKey);

    // Prevent the page behind the lightbox from scrolling.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [activeKey, closeProof]);

  const proof = activeKey ? proofs[activeKey] : null;

  return (
    <ProofContext.Provider value={{ openProof, proofs }}>
      {children}

      {proof && (
        <div
          className="proof"
          role="dialog"
          aria-modal="true"
          aria-label={proof.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeProof();
          }}
        >
          <div className="proof__panel">
            <div className="proof__head">
              <div className="proof__heading">
                <span className="eyebrow">Bukti</span>
                <span className="proof__title">{proof.title}</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="icon-btn icon-btn--sm"
                onClick={closeProof}
                aria-label="Tutup bukti"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 1.5l8 8M9.5 1.5l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="proof__stage">
              {failed ? (
                <p className="proof__missing mono">
                  Dokumen belum tersedia di <code>{proof.image}</code>.
                </p>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proof.image}
                  alt={proof.alt || proof.title}
                  className="proof__img"
                  onError={() => setFailed(true)}
                />
              )}
            </div>

            {proof.note && <span className="proof__note mono">{proof.note}</span>}
          </div>
        </div>
      )}
    </ProofContext.Provider>
  );
}

export function useProof() {
  return useContext(ProofContext);
}
