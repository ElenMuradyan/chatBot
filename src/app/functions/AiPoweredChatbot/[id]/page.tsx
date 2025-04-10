'use client';
import { useEffect, useState } from 'react';
import { SendToAiChatbot } from '@/utilis/helpers/sendMessage';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, messagesHistory } from '@/state-management/slices/userSlice';
import { AppDispatch, RootState } from '@/state-management/store';
import ChatContainer from '@/components/ChatContainer/page';
import { useParams } from 'next/navigation';
import { message } from '@/types/userData';
import { addMessagesDoc, fetchMessages, updateMessagesDoc } from '@/utilis/helpers/fetchMessages';
import { CHATBOT_PERSONALITIES, ROUTE_PATHS } from '@/utilis/constants';
import '../../../../styles/chat.css';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import ChatStart from '@/components/ChatStart/page';
import { Personality } from '@/types/fetchMessages';

export default function ChatPage() {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [ personality, setPersonality ] = useState<Personality | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [ routeId, setRouteId ] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    userData && dispatch(messagesHistory({collectionName: 'AiPoweredChatbot', uid: userData.uid}))
  }, [userData]);

  useEffect(() => {
    async function fetch() {
      if(id && userData){
        const data = await fetchMessages({uid: userData.uid, chatId: id as string, collectionName: 'AiPoweredChatbot'});
        if(data){
          setMessages(data.messages);
          setPersonality(data.personality);
        }
      }  
    };

    fetch();
  }, [userData, id]);  

  const sendMessage = async () => {
    const message = input.trim();
    if (!message) return;

    if(personality){
      try{
        setInput('');
        setLoading(true);
        const newMessage = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);
        const response = await SendToAiChatbot({messages: [...messages,  { sender: 'user', text: input }], personality});
  
        if(!messages.length && userData){
          const id = await addMessagesDoc({ uid: userData?.uid, collectionName: 'AiPoweredChatbot', personality ,messages: [{sender: 'user', text: message}, { sender: 'bot', text: response}]});
          window.history.replaceState(null, '', `${ROUTE_PATHS.AIPOWEREDCHATBOT}/${id}`);
          setRouteId(id as string);
        }else{
          const updateId = id === 'newChat' ? routeId : id;
         userData && updateMessagesDoc({ uid: userData.uid, collectionName: 'AiPoweredChatbot', messages: [...messages, {sender: 'user', text: message},{ sender: 'bot', text: response}], id: updateId as string});
        };
  
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
      }  
    }else{
      setPersonality('Good Assistant');
      sendMessage();
    }
  };

  useEffect(() => {
    console.log(personality);
    console.log(messages);
  }, [personality])

  return ( 
    <div className='chatContainer'>
      {
        (messages.length || personality) ? <ChatContainer messages={messages} sendMessage={sendMessage} input={input} setInput={setInput} loading={loading}/> : <ChatStart setPersonality={setPersonality}/>
      }
      {
        (!messages.length && personality) && <h1>Write to your personal AI {personality}</h1> 
     }

        <div className="inputContainer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
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
   );
}