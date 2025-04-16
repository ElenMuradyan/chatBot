import { message } from "@/types/userData";
import { formatMessagesForWritingAssistant } from "@/utilis/helpers/formatMessagesForOpenRouter ";

export async function sendMessageToWrittingAssistant ({messages, functionName}: {messages: message[], functionName: string}) {
    const formattedMessages = formatMessagesForWritingAssistant({messages});

    try{
        const response = await fetch(
            '/api/functions/WrittingAssistant',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    messages: formattedMessages,
                    task: functionName,
                    text: messages[messages.length-1].text,
                 }),    
                }
        );
    
        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error with sending message to AI:", error);
        return "Sorry, there was an issue with the request. Please check your connection and try again.";
    }
}