import { SITE_URL } from '@/lib/site';

/**
 * One page, one entry. `lastModified` is the build timestamp, which is the
 * truthful answer for a statically generated page and doubles as the freshness
 * signal AI search surfaces weigh.
 */
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
