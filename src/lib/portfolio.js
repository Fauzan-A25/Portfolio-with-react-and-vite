import { fetchAllData } from '@/utils/fetchFromSheets';
import { mergeWithLocal } from '@/utils/mergePortfolioData';
import localData from '@/data/portfolioData';

// The sheet is edited by hand a few times a month, so an hour-stale page is
// harmless — and it keeps Apps Script from being hit on every request.
const REVALIDATE_SECONDS = 3600;

/**
 * Resolves the portfolio on the server so the HTML that reaches a crawler is
 * the full page, not a loading screen. AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, OAI-SearchBot) do not execute JavaScript, so anything fetched
 * in `useEffect` is invisible to them.
 *
 * Never throws: a failed or slow sheet degrades to the bundled copy, which is
 * complete.
 */
/**
 * `proofs[*].match` is a RegExp used only while merging sheet rows. React
 * cannot serialise a RegExp across the server/client boundary, and no client
 * component reads it, so it is dropped once the merge is done.
 */
function serialisable(data) {
  const proofs = Object.fromEntries(
    Object.entries(data.proofs || {}).map(([key, { match, ...rest }]) => [key, rest]),
  );
  return { ...data, proofs };
}

export async function getPortfolioData() {
  try {
    const remote = await fetchAllData({ next: { revalidate: REVALIDATE_SECONDS } });
    return serialisable(mergeWithLocal(remote));
  } catch (error) {
    console.warn('[portfolio] Sheets unavailable, serving bundled data:', error.message);
    return serialisable(localData);
  }
}

export { REVALIDATE_SECONDS };
