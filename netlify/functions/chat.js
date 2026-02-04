/**
 * Netlify Function: AI chat endpoint
 * Env:
 *   OPENAI_API_KEY (required)
 *   OPENAI_MODEL (optional, default: gpt-4o-mini)
 */
exports.handler = async (event) => {
  try{
    if(event.httpMethod !== 'POST'){
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { message, lang, page } = JSON.parse(event.body || '{}');
    const apiKey = process.env.OPENAI_API_KEY;
    if(!apiKey){
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing OPENAI_API_KEY' }) };
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const sys = (lang === 'fa')
      ? 'تو یک دستیار وب‌سایت شخصی هستی. پاسخ کوتاه، دقیق و مفید بده. اگر سوال درباره بخش‌های سایت است، کاربر را به صفحه مناسب هدایت کن. اگر مطمئن نیستی، بگو و یک سوال کوتاه برای روشن‌شدن بپرس.'
      : 'You are an assistant for a personal portfolio website. Answer briefly, accurately, and helpfully. If the user asks about site sections, direct them to the correct page. If unsure, say so and ask one short clarifying question.';

    const user = `User message: ${message}\nPage: ${page || ''}`;

    const payload = {
      model,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ],
      temperature: 0.4
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if(!r.ok){
      const errText = await r.text();
      return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI error', details: errText }) };
    }

    const data = await r.json();
    const reply = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
      ? String(data.choices[0].message.content).trim()
      : '';

    // Minimal escaping to safely render in the chat bubble.
    const safe = reply
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/\n/g,'<br/>');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: safe })
    };
  }catch(err){
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error', details: String(err) }) };
  }
};
