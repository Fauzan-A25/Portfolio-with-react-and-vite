import { SITE_URL, abs } from '@/lib/site';

/**
 * A portfolio wants maximum reach, so every crawler is allowed. The AI agents
 * are still listed one by one: an explicit `Allow` documents the intent and
 * survives someone later adding a blanket `Disallow` to the wildcard group.
 *
 * Only /api/ is closed — it holds the chat route handler, which has nothing
 * indexable and costs a Gemini call per request.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — training + ChatGPT web
  'OAI-SearchBot', // OpenAI — search index
  'ChatGPT-User', // OpenAI — user-initiated browsing
  'ClaudeBot', // Anthropic — Claude web features
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot', // Perplexity — index
  'Perplexity-User', // Perplexity — user-initiated fetch
  'Google-Extended', // Gemini / AI Overviews grounding opt-in
  'Applebot-Extended',
  'meta-externalagent',
  'cohere-ai',
  'CCBot', // Common Crawl — feeds many open models
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: '/api/' })),
    ],
    sitemap: abs('/sitemap.xml'),
    host: SITE_URL,
  };
}
