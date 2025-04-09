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
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/utilis/constants';
import '../../../../styles/chat.css';

export default function ChatPage() {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [messages, setMessages] = useState<message[]>([
    {sender: 'bot', text: 'Hi, how can I assist you.'}
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();
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
        const messages = await fetchMessages({uid: userData.uid, chatId: id as string, collectionName: 'AiPoweredChatbot'});
        setMessages(messages);
      }  
    };

    fetch();
  }, [userData, id]);  

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
        if(messages.length === 1 && userData){
          const id = await addMessagesDoc({ uid: userData?.uid, collectionName: 'AiPoweredChatbot', messages: [...messages, {sender: 'user', text: message}, { sender: 'bot', text: response}]});
          push(`${ROUTE_PATHS.AIPOWEREDCHATBOT}/${id}`);
          }else if(messages.length > 1 && userData){
          updateMessagesDoc({ uid: userData.uid, collectionName: 'AiPoweredChatbot', messages: [...messages, {sender: 'user', text: message},{ sender: 'bot', text: response}], id: id as string});
        }
    }catch(error: any){
      notification.error({
        message: error.message
      })
    }finally{
      setLoading(false);
    }
  };

  return ( 
    <ChatContainer messages={messages} sendMessage={sendMessage} input={input} setInput={setInput} loading={loading}/>
   );
}