export const formatMessagesForOpenRouter = (messages: {sender: string, text: string}[]) => {
    return[
        { 
            role: 'system', 
            content: 'You are a helpful assistant. Answer logically and kindly.'
        }
,                  ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
    ]
}