import portfolioData from '@/data/portfolio/index';

/**
 * Drops sheet-level RegExp objects that React cannot serialise across the
 * server/client boundary.  `match` strings in proofs.json are for the now-
 * removed Sheets merge path and are unused by components, so they are safe
 * to strip before handing the data to the page.
 */
function serialisable(data) {
  const proofs = Object.fromEntries(
    Object.entries(data.proofs || {}).map(([key, { match, ...rest }]) => [key, rest]),
  );
  return { ...data, proofs };
}

/** Pure JSON portfolio data — zero runtime fetches. */
export async function getPortfolioData() {
  return serialisable(portfolioData);
}

export const REVALIDATE_SECONDS = 3600; // ISR: 1 hour
