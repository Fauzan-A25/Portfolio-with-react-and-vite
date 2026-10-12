/**
 * POST /api/chat — portfolio AI assistant.
 *
 * Talks to any OpenAI-compatible endpoint (here: 9router on the home server)
 * over plain `fetch` — no SDK, so there is no extra dependency to install in
 * the standalone build.
 *
 * Two things this endpoint has to absorb, because the upstream gateway is
 * quirky:
 *   1. 9router replies with `text/event-stream` unless `stream: false` is sent
 *      explicitly, so both JSON and SSE bodies are parsed.
 *   2. The gateway serves several models with wildly different latency
 *      (1.1s … 44s measured), so a primary model plus an ordered fallback list
 *      is tried before giving up.
 *
 * Contract with the client (src/components/AiAssistant/AiAssistant.jsx):
 *   in  → { message: string, context: string }
 *   out → { success: true, response: string }            normal answer
 *         { success: true, response: string, fallback: true }  AI unavailable
 * The fallback is a 200 on purpose: the client then answers from local data
 * instead of showing an error, so the site still works with no key at all.
 */

export const runtime = 'nodejs';
export const maxDuration = 30;

const FALLBACK =
  '🤖 AI is not configured yet. Ask about skills, projects, or experience and I will answer from the portfolio data directly.';

// Trailing slashes stripped so `${BASE_URL}/chat/completions` never doubles up.
const BASE_URL = (process.env.AI_BASE_URL || 'http://127.0.0.1:20128/v1').replace(/\/+$/, '');
const PRIMARY_MODEL = process.env.AI_MODEL || 'gemini/gemini-3.5-flash-lite';
const FALLBACK_MODELS = (process.env.AI_MODEL_FALLBACKS || 'gemini/gemini-3.6-flash')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);
const TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS || 20000);

/** Pull the assistant text out of a non-streaming chat.completion body. */
function readJsonBody(raw) {
  const data = JSON.parse(raw);
  const choice = (data.choices || [])[0] || {};
  return (choice.message && choice.message.content) || '';
}

/**
 * Reassemble a `data: {...}` SSE stream. 9router always terminates with a
 * final chunk carrying `finish_reason` and `usage`; `[DONE]` is optional.
 */
function readSseBody(raw) {
  let text = '';
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === '[DONE]') continue;
    try {
      const chunk = JSON.parse(payload);
      const choice = (chunk.choices || [])[0] || {};
      if (choice.delta && choice.delta.content) text += choice.delta.content;
    } catch {
      // A malformed frame should not throw away the text collected so far.
    }
  }
  return text;
}

async function callModel(model, systemPrompt, apiKey) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: systemPrompt }],
        temperature: 0.7,
        // Generous cap: these models spend completion tokens on reasoning
        // before emitting content, and a tight cap can return an empty string.
        max_tokens: 4096,
        stream: false,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${detail.slice(0, 200)}`);
    }

    const contentType = res.headers.get('content-type') || '';
    const raw = await res.text();
    return contentType.includes('event-stream') ? readSseBody(raw) : readJsonBody(raw);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { message, context } = body || {};
  if (typeof message !== 'string' || !message.trim()) {
    return Response.json({ error: 'Message required' }, { status: 400 });
  }

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return Response.json({ success: true, response: FALLBACK, fallback: true });
  }

  const systemPrompt = `You are a helpful AI assistant for a portfolio website.

GUIDELINES:
- ONLY use the provided context. Never invent facts, numbers, or code.
- Write in clear, grammatically correct English. Full sentences, correct verb forms.
- Use markdown formatting (bold for names, bullets for lists when appropriate).
- Output the answer and nothing else. Do NOT add meta-commentary, notes about what
  you skipped or omitted, "add when..." suggestions, or code blocks unless the user
  explicitly asks for code.
- Be conversational and as long as the question needs.
- If information is missing, say it is not available in the portfolio.

CONTEXT:
${context || 'No context provided'}

QUESTION: ${message}

Answer now.`;

  const attempts = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  const errors = [];

  for (const model of attempts) {
    try {
      const text = (await callModel(model, systemPrompt, apiKey)).trim();
      if (text) {
        return Response.json({ success: true, response: text, model });
      }
      errors.push(`${model}: empty response`);
    } catch (error) {
      errors.push(`${model}: ${error.message}`);
    }
  }

  console.error('[api/chat] all models failed —', errors.join(' | '));
  return Response.json({ success: true, response: FALLBACK, fallback: true });
}
