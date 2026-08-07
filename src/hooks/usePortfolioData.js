'use client';

import { useEffect, useState } from 'react';
import { fetchAllData } from '@/utils/fetchFromSheets';
import { mergeWithLocal } from '@/utils/mergePortfolioData';
import localData from '@/data/portfolioData';

function friendlyError(message) {
  if (!message) return 'Unknown error';
  if (message.includes('Failed to fetch')) {
    return 'Cannot reach the Google Sheets API. Check your connection or try again later.';
  }
  if (message.includes('NetworkError')) return 'Network error while fetching data.';
  return message;
}

/**
 * Normally the page is resolved on the server (see lib/portfolio.js) and handed
 * in as `initialData`; in that case this hook does nothing but pass it through,
 * so there is no second fetch and no loading flash.
 *
 * The client-fetch branch is the fallback for any render that has no server
 * data to start from.
 */
export function usePortfolioData(initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) return undefined;

    let cancelled = false;

    (async () => {
      try {
        const remote = await fetchAllData();
        if (!cancelled) setData(mergeWithLocal(remote));
      } catch (err) {
        console.error('[PortfolioData] Fetch failed, using bundled data:', err);
        if (!cancelled) {
          // The bundled copy is complete, so a failed fetch degrades rather
          // than blocks — the visitor still sees the whole portfolio.
          setData(localData);
          setError(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  return { data, loading, error };
}

export { friendlyError };
