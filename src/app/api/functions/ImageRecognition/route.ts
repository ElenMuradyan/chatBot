export async function POST(req: Request) {
    try {
      const body = await req.text();
  
      if (!body) {
        return new Response(JSON.stringify({ error: 'Missing request body' }), { status: 400 });
      }
  
      const { imageUrl, prompt } = JSON.parse(body);

      if (!imageUrl || !prompt) {
        return new Response(JSON.stringify({ error: 'Missing imageUrl or prompt' }), { status: 400 });
      }
  
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHATBOT_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-4',
          messages: [
            { role: 'system', content: 'You are an image recognition assistant.' },
            { role: 'user', content: `Look at this image: ${imageUrl}. ${prompt}` }
          ]
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error from OpenRouter:', result);
        return new Response(JSON.stringify({ error: 'OpenRouter error', details: result }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (error) {
      console.error('Server error:', error);
      return new Response(JSON.stringify({ error: 'Server Error', message: String(error) }), { status: 500 });
    }
  }
  