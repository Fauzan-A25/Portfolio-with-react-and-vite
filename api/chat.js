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
      return res.status(500).json({ 
        success: false, 
        error: 'API key missing',
        fallback: true 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
    });

    const prompt = `${context || ''}\n\nQ: ${message}\n\nA:`;
    const result = await model.generateContent(prompt);
    
    return res.status(200).json({ 
      success: true,
      response: await result.response.text()
    });

  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message,
      fallback: true 
    });
  }
}