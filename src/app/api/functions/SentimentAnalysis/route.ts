export async function POST(request: Request) {
    const { prompt } = await request.json();

    try{
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHATBOT_API_KEY}`,
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                  {
                    role: "system",
                    content: `You are a sentiment analysis assistant. Analyze the sentiment of the user's message and provide a detailed explanation. Your response should include:

                    1. The overall sentiment (Positive, Neutral, or Negative).
                    2. A brief justification for why this sentiment was inferred, based on the language and tone of the message.
                    3. Any emotional cues you identified.
                    
                    Respond in natural language as if you're explaining it to a non-technical user.`
                },
                  {
                    role: "user",
                    content: prompt
                  }
                ]
              })        
        });

        if (!response.ok) {
            throw new Error('Failed to analyze sentiment.');
        };

          const data = await response.json();

          const description = data.choices?.[0]?.message?.content?.trim();
      
          return new Response(JSON.stringify({ description }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }catch( error ){
            const err = error as Error;
            console.error('SentimentAnalysis API error:', err); 
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}