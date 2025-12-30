// src/hooks/usePortfolioData.js
import { useState, useEffect } from 'react';
import { fetchAllData } from '../utils/fetchFromSheets';

// Helper untuk bikin pesan error yang lebih ramah
function getFriendlyErrorMessage(error) {
  if (!error) return 'Unknown error';
  if (error.includes('Failed to fetch')) {
    return 'Cannot reach Google Sheets API. Please check your internet connection or try again later.';
  }
  if (error.includes('NetworkError')) {
    return 'Network error occurred while fetching data.';
  }
  return error;
}

export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const portfolioDataSheets = await fetchAllData();

        if (!portfolioDataSheets) {
          throw new Error('Portfolio data is empty or invalid');
        }

        if (!cancelled) {
          setData(portfolioDataSheets);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[PortfolioData] Fetch error:', err);
          setError(getFriendlyErrorMessage(err.message || String(err)));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    // Cleanup untuk mencegah update state setelah unmount
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
