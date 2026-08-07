import data from '@/data/portfolio.json';

/**
 * The portfolio content, resolved at build time from `src/data/portfolio.json`.
 *
 * That file is the single source of truth: edit it, commit, redeploy. There is
 * no network call here on purpose — the page is fully static, so the HTML a
 * crawler receives can never be a loading screen or a degraded fallback. AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) do not execute
 * JavaScript, so anything resolved after first paint is invisible to them.
 *
 * Previously this fetched a Google Sheet through Apps Script. That is gone:
 * the sheet silently coerced values (a "3.8" GPA cell arrived as a Date), the
 * endpoint could 404 without warning, and every render depended on it being up.
 */
export function getPortfolioData() {
  return data;
}

export default data;
