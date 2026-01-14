import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ✅ FIXED: Parse JSON body
  let body;
  try {
    body = JSON.parse(await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(data));
      req.on('error', reject);
    }));
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { message, context } = body;
  
  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Message required' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({  // ✅ 200, not 500
        success: true,
        response: '🤖 AI ready! Ask about skills, projects, or experience. *(Setup in progress)*',
        fallback: true 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
    });

    const systemPrompt = `You are a helpful AI assistant for a portfolio website.

GUIDELINES:
- ONLY use provided context - don't make up information
- Give substantive answers with specific examples and dates
- Connect related skills, projects, and experiences when relevant
- Keep responses focused and conversational
- Use markdown (bold for names, bullets for lists)
- If info is missing, say it's not in the portfolio
- Aim for 2-3 clear paragraphs, not overly long

CONTEXT:
${context || 'No context provided'}

QUESTION: ${message}

Respond directly with helpful information.`;

    const result = await model.generateContent(systemPrompt);
    
    // ✅ FIXED: Direct access, NO await text()
    const responseText = result.response.text();
    
    return res.status(200).json({ 
      success: true,
      response: responseText
    });

  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(200).json({  // ✅ 200 for frontend fallback
      success: false,
      error: error.message,
      fallback: true,
      response: '💬 Using local knowledge about skills, projects, and experience.'
    });
  }
}
