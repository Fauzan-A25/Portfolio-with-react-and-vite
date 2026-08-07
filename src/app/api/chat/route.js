import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const maxDuration = 30;

const FALLBACK =
  '🤖 AI is not configured yet. Ask about skills, projects, or experience and I will answer from the portfolio data directly.';

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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // 200 so the client falls back to its local answers instead of erroring.
    return Response.json({ success: true, response: FALLBACK, fallback: true });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    });

    const systemPrompt = `You are a helpful AI assistant for a portfolio website.

GUIDELINES:
- ONLY use provided context - don't make up information
- Give substantive and natural answers with specific examples and dates when relevant
- Connect related skills, projects, and experiences to provide comprehensive insight
- Be conversational and helpful, responding in whatever length makes sense for the question
- Use markdown formatting (bold for names, bullets for lists when appropriate)
- If information is missing, mention it's not available in the portfolio

CONTEXT:
${context || 'No context provided'}

QUESTION: ${message}

Respond naturally and comprehensively with helpful information.`;

    const result = await model.generateContent(systemPrompt);

    return Response.json({ success: true, response: result.response.text() });
  } catch (error) {
    console.error('[api/chat] Gemini error:', error);
    return Response.json({
      success: true,
      response: FALLBACK,
      fallback: true,
    });
  }
}
