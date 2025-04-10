import { useEffect, useRef } from "react";
import { BotMessage } from "../BotMessage/page";
import { chatInterface } from "@/types/chatInterface";

export default function ChatContainer ({messages, loading}: chatInterface) {
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);  

    useEffect(() => {
      messagesContainerRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);
  
    return(   
        <div className="messagesContainer">
          {messages?.map((msg, idx) => {
            const isLast = idx === messages.length - 1;
            
            return(
                <div
                key={idx}
                className={`message max-w-[70%] px-4 py-2 text-sm ${
                    msg.sender === 'user'
                    ? 'user ml-auto'
                    : ''
                }`}
                >
                {isLast && idx ? <BotMessage text={msg.text} /> : msg.text}
                </div>)
          }
          )} 
                  {
            loading ? <div className='loader' /> : null
          }
       <div className='hi' ref={messagesContainerRef}></div>
      </div>
  )
};