'use client';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { messagesHistory } from '@/state-management/slices/userSlice';
import { AppDispatch, RootState } from '@/state-management/store';
import ChatContainer from '@/components/ChatContainer/page';
import { useParams } from 'next/navigation';
import { message } from '@/types/userData';
import { addMessagesDoc, fetchMessages, updateMessagesDoc } from '@/utilis/helpers/fetchMessages';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { sendMessageToWrittingAssistant } from '@/utilis/helpers/sendMessageToWrittingAssistant';
import { ROUTE_PATHS, writingTaskPlaceholders } from '@/utilis/constants';

import '../../../../../styles/chat.css';
import MainLoader from '@/components/LoadingWrapper/page';

export default function WrittingChatPage() {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [mainLoading, setMainLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [ routeId, setRouteId ] = useState<string>('');
  const { id, function: functionName } = useParams();

    useEffect(() => {
        if(userData){
            dispatch(messagesHistory({collectionName: 'WrittingAssistant', functionName: functionName as string}))
        }
    }, [userData]);
  
  useEffect(() => {
    async function fetch() {
        try{
            setMainLoading(true);
            if(id){
                const data = await fetchMessages({chatId: id as string, collectionName: 'WrittingAssistant', functionName: functionName as string});
                if(data){
                  setMessages(data.messages);
                }
              }  
        }catch{
            console.log('Error');
        }finally{
            setMainLoading(false);
        }
    };

    fetch();
  }, [userData, id, functionName]);  

  const sendMessage = async () => {    
    const message = input.trim();

    if (!message) return;
      try{
        setInput('');
        setLoading(true);
        const newMessage = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);
        const response = await sendMessageToWrittingAssistant({messages: [...messages,  { sender: 'user', text: input }], functionName: functionName as string});  

        if(!messages.length){
          const id = await addMessagesDoc({ collectionName: 'WrittingAssistant' ,messages: [{sender: 'user', text: message}, { sender: 'bot', text: response}], functionName: functionName as string});
          window.history.replaceState(null, '', `${ROUTE_PATHS.FUNCTIONS}/${functionName}/${id}`);
          setRouteId(id as string);
        }else{
          const updateId = id === 'newChat' ? routeId : id;
            updateMessagesDoc({ collectionName: 'WrittingAssistant', messages: [...messages, {sender: 'user', text: message},{ sender: 'bot', text: response}], id: updateId as string, functionName: functionName as string});
        };
  
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: response
          }
        ]); 
        return response;
    }catch( error ){
        const err = error as Error;
        notification.error({
          message: err.message
        })
      }finally{
        setLoading(false);
      } 
  };

  return (
    <MainLoader loading={mainLoading}>
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
    </MainLoader>
   );
}