import { formatMessagesForOpenRouter } from "./formatMessagesForOpenRouter ";

export async function SendToAiChatbot(messages: {sender: string, text: string}[]) {
    try {
        const history = formatMessagesForOpenRouter(messages);
        const response = await fetch('/api/functions/AiPoweredChatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: history }),
        });

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error with sending message to AI:", error);
        return "Sorry, there was an issue with the request. Please check your connection and try again.";
    }
}
