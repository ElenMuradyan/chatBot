import { useEffect, useRef } from "react";
import { BotMessage } from "../BotMessage/page";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { chatInterface } from "@/types/chatInterface";

export default function ChatContainer ({messages, loading, input, setInput, sendMessage}: chatInterface) {
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);  

    useEffect(() => {
      messagesContainerRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);
  
    return(   
     <div className='chatContainer'>
        <div className="messagesContainer">
          {messages?.map((msg, idx) => {
            const isLast = idx === messages.length - 1;
            console.log(idx, isLast);
            
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
        <div className="inputContainer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            disabled={loading}
            onClick={() => !loading ? sendMessage() : null}
          >
            {loading ? <LoadingOutlined /> : <SendOutlined />}
          </button>
        </div>
        </div>
  )
};