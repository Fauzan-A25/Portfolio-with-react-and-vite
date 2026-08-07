/**
 * One canonical origin for metadata, JSON-LD, the sitemap, robots.txt and
 * llms.txt. Getting this wrong points every canonical URL and every schema
 * `@id` at a domain that isn't the live one, so it is resolved in one place.
 *
 * Precedence:
 *   1. NEXT_PUBLIC_SITE_URL      — set this to the production domain.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel automatically.
 *   3. The production domain, hardcoded, so a build that forgets the variable
 *      still emits correct canonical URLs instead of poisoning them.
 *
 * The previous fallback was `https://fauzan-a25.github.io`, a host that now
 * returns 404. A canonical tag pointing at a dead URL is worse than none: it
 * tells Google the real page is a duplicate of something that does not exist.
 */
const FALLBACK = 'https://portfolio.fauzanahsan.my.id';

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return FALLBACK;
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL for a site-relative path. */
export const abs = (path = '/') => new URL(path, `${SITE_URL}/`).toString();

export const SITE_NAME = 'Fauzan Ahsanudin Alfikri — Data Science Portfolio';
