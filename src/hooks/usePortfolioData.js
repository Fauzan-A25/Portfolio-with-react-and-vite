/**
 * No-op hook — all data is resolved on the server now.
 *
 * The portfolio data is pure JSON files imported at build time (see
 * src/data/portfolio/index.js).  There is no runtime fetch, no Sheets API,
 * no loading state, and no error path.  The `initialData` prop is always set
 * by the server-side page component, so this hook simply returns it.
 *
 * Kept as a hook (rather than a plain import) so every existing component
 * that calls `usePortfolioData()` compiles without changes.
 */
'use client';

import { useState } from 'react';

export function usePortfolioData(initialData = null) {
  // Data always arrives from the server — nothing to fetch.
  const [data] = useState(initialData);
  return { data, loading: false, error: null };
}

export function friendlyError(message) {
  return message || 'Unknown error';
}
