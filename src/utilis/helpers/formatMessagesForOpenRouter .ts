import { formatMessagesForOpenRouterInterface } from "@/types/fetchMessages"
import { CHATBOT_PERSONALITIES } from "../constants"

export const formatMessagesForOpenRouter = ({messages, personality}: formatMessagesForOpenRouterInterface) => {
    return[
        { 
            role: 'system', 
            content: personality && CHATBOT_PERSONALITIES[personality]
        }
,                  ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
    ]
}

export const formatMessagesForWritingAssistant = ({messages}: formatMessagesForOpenRouterInterface) => {
    return[
        { 
            role: 'system', 
            content: 'You are a creative and helpful writing assistant.'
        },
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
    ]
}