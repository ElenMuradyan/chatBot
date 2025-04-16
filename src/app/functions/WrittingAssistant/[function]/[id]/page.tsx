'use client';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, messagesHistory } from '@/state-management/slices/userSlice';
import { AppDispatch, RootState } from '@/state-management/store';
import ChatContainer from '@/components/ChatContainer/page';
import { useParams } from 'next/navigation';
import { message } from '@/types/userData';
import { addMessagesDoc, fetchMessages, updateMessagesDoc } from '@/utilis/helpers/fetchMessages';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { sendMessageToWrittingAssistant } from '@/utilis/helpers/sendMessageToWrittingAssistant';
import { ROUTE_PATHS, writingTaskPlaceholders } from '@/utilis/constants';

import '../../../../../styles/chat.css';

export default function WrittingChatPage() {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const [ routeId, setRouteId ] = useState<string>('');
  const { id, function: functionName } = useParams();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

    useEffect(() => {
      userData && dispatch(messagesHistory({collectionName: 'AiPoweredChatbot', uid: userData.uid, functionName: functionName as string}))
    }, [userData]);
  
  useEffect(() => {
    async function fetch() {
      if(id && userData){
        const data = await fetchMessages({uid: userData.uid, chatId: id as string, collectionName: 'WrittingAssistant', functionName: functionName as string});
        if(data){
          setMessages(data.messages);
        }
      }  
    };

    fetch();
  }, [userData, id, functionName]);  

  const sendMessage = async () => {    
    const message = input.trim();
    console.log('hi', functionName);

    if (!message) return;
      try{
        setInput('');
        setLoading(true);
        const newMessage = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);
        const response = await sendMessageToWrittingAssistant({messages: [...messages,  { sender: 'user', text: input }], functionName: functionName as string});  

        if(!messages.length && userData){
          const id = await addMessagesDoc({ uid: userData?.uid, collectionName: 'WrittingAssistant' ,messages: [{sender: 'user', text: message}, { sender: 'bot', text: response}], functionName: functionName as string});
          window.history.replaceState(null, '', `${ROUTE_PATHS.FUNCTIONS}/${functionName}/${id}`);
          setRouteId(id as string);
        }else{
          const updateId = id === 'newChat' ? routeId : id;
         userData && updateMessagesDoc({ uid: userData.uid, collectionName: 'WrittingAssistant', messages: [...messages, {sender: 'user', text: message},{ sender: 'bot', text: response}], id: updateId as string, functionName: functionName as string});
        };
  
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: response
          }
        ]); 
        return response;
      }catch(error: any){
        notification.error({
          message: error.message
        })
      }finally{
        setLoading(false);
      } 
  };

  return (
      <div className='chatContainer'>
        <ChatContainer messages={messages} loading={loading} sendMessage={sendMessage} setInput={setInput} input={input}/>
        <h1>Write to your personal AI Writing Assistant</h1>
        <div className="inputContainer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder={writingTaskPlaceholders[functionName as keyof typeof writingTaskPlaceholders]}
          />
          <div className='buttonContainer'>
          <button
            disabled={loading}
            onClick={() => !loading ? sendMessage() : null}
          >
            {loading ? <LoadingOutlined /> : <SendOutlined />}
          </button>
          </div>
        </div>
    </div>
   );
}