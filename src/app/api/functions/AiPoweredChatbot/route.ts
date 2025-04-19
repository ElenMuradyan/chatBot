export async function POST(request: Request) {
    try{
        const { messages } = await request.json();

        if (!messages) {
            return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
        }      
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHATBOT_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages: messages
            })
        }) 

        const data = await response.json();

        const reply = data.choices?.[0]?.message?.content  || 'No response from model.';

        return new Response(JSON.stringify({reply}), {status: 200});
    }catch( error ){
        const err = error as Error;
        console.error('Error with OpenAI API:', err);
        return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });    
    }
}