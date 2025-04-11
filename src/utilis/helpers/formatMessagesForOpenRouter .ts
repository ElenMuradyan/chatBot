import { formatMessagesForOpenRouterInterface } from "@/types/fetchMessages"
import { CHATBOT_PERSONALITIES } from "../constants"

export const formatMessagesForOpenRouter = ({messages, personality}: formatMessagesForOpenRouterInterface) => {
    return[
        { 
            role: 'system', 
            content: CHATBOT_PERSONALITIES[personality]
        }
,                  ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
    ]
}