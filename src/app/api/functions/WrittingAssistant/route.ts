export async function POST(request: Request) {
    const { task, text, messages } = await request.json();
  
    let prompt = "";
  
    switch (task) {
      case "email":
        prompt = `Write a professional email: ${text}`;
        break;
      case "improve":
        prompt = `Improve the grammar and tone of this text: "${text}"`;
        break;
      case "rewrite":
        prompt = `Rewrite the following text to sound more confident: "${text}"`;
        break;
      case "expand":
        prompt = `Expand on this idea in more detail: "${text}"`;
        break;
      case "shorten":
        prompt = `Summarize this: "${text}"`;
        break;
      case "social":
        prompt = `Write a social media caption for this: "${text}"`;
        break;
      case "blog":
        prompt = `Write a blog post based on: "${text}". Use this tone: more confident`;
        break;
      default:
        if (text) {
          prompt = `Help with this writing task: "${text}"`;
        }
    }
  
    const updatedMessages = prompt
      ? [...messages, { role: "user", content: prompt }]
      : messages;
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHATBOT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: updatedMessages,
          max_tokens: 150,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("OpenRouter response:", JSON.stringify(data, null, 2));

      const reply = data.choices?.[0]?.message?.content || "No response from model.";
  
      return new Response(JSON.stringify({ reply }), { status: 200 });
    }catch( error ){
      const err = error as Error;
      console.error("Error with Writing Assistant POST route:", err);
      return new Response(JSON.stringify({ error: "Error with Writing Assistant POST route" }), { status: 500 });
    }
  }
  