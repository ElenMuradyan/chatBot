'use client';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { SendToAiChatbot } from '@/utilis/helpers/sendMessage';
import { notification } from 'antd';
import '../../../styles/chat.css';
import { BotMessage } from '@/components/BotMessage/page';

export default function AiPoweredChatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! How can I assist you today?' }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);  

  useEffect(() => {
    messagesContainerRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages]);

  const sendMessage = async () => {
    const message = input.trim();
    if (!message) return;

    try{
      setInput('');
      setLoading(true);
      const newMessage = { sender: 'user', text: input };
      setMessages([...messages, newMessage]);
  
      const response = await SendToAiChatbot([...messages,  { sender: 'user', text: input }]);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: response
          }
        ]); 
        
    }catch(error: any){
      notification.error({
        message: error.message
      })
    }finally{
      setLoading(false);
      if (messagesContainerRef.current) {
        messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }    
    }
  };

  return (
    <div className='chatContainer'>
      <div className="messagesContainer">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message max-w-[70%] px-4 py-2 text-sm ${
              msg.sender === 'user'
                ? 'user ml-auto'
                : ''
            }`}
          >
            {msg.sender === 'bot' ?  <BotMessage text={msg.text} /> : msg.text}
          </div>
        ))} 
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
          {loading ? <LoadingOutlined /> : <SendOutlined/>}
        </button>
      </div>
      </div>
  );
}