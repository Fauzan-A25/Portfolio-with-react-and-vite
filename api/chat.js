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
      generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
    });

    const systemPrompt = `You are a knowledgeable and friendly AI assistant for a portfolio website. Your role is to help visitors understand the person's background, skills, and work in detail.

IMPORTANT INSTRUCTIONS:
- ONLY answer questions based on the provided context information below
- Provide DETAILED and COMPREHENSIVE answers - include specific examples, technologies, achievements, and dates when relevant
- When discussing skills, mention relevant projects or experience that demonstrate those skills
- When discussing projects, explain what makes them noteworthy and what was accomplished
- Be conversational, engaging, and professional
- Use proper formatting (bold for names, bullet points for lists when appropriate)
- If asked about something NOT in the context, politely say "I don't have that information in the portfolio, but you can find more details in the full portfolio or contact directly"
- Do not make up information or hallucinate facts
- If you're unsure, admit it rather than guess

PORTFOLIO CONTEXT:
${context || 'No context provided'}

---

User Question: ${message}

Respond naturally, helpfully, and with good detail, staying true to the information provided above. Share relevant context and make connections between different skills, projects, and experiences when appropriate.`;

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
