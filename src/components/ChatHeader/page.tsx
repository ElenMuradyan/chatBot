'use client'
import icon from '../../../public/favicon.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state-management/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utilis/constants";
import { useState } from "react";
import { BackwardOutlined } from "@ant-design/icons";
import { messagesHistory } from "@/state-management/slices/userSlice";
import Link from "next/link";
import '../../styles/header.css';

export default function ChatHeader () {
    const { messages } = useSelector((state: RootState) => state.userData.authUserInfo);
    const { push } = useRouter();
    const [ displayHistory, setDisplayHistory ] = useState<boolean>(false);
    const pathName = usePathname();
    const isChatPage = (pathName.includes(ROUTE_PATHS.AIPOWEREDCHATBOT) || pathName.includes(ROUTE_PATHS.WRITTINGASSISTANT)) && !pathName.endsWith('WrittingAssistant');
    const dispatch = useDispatch<AppDispatch>();
    const { function: functionName } = useParams();

    const handleDisplayStory = () => {
        setDisplayHistory(true);
        dispatch(messagesHistory({collectionName: pathName.split('/')[2], functionName: functionName as string}));
    };
      
    return(
        <div className="chatHeaderContainer">
         <div className={`historyContainer ${displayHistory ? 'show' : ''}`} > 
                <h1>History</h1>
                <button className="headerButton" onClick={() => setDisplayHistory(false)}><BackwardOutlined />Back to chat</button>
                {
                   messages && Object.entries(messages).map(([key, value], idx) => {
                        return(
                            <div 
                            key={idx} 
                            className="historyItem" 
                            onClick={() => {
                                const elements = pathName.split('/');
                                elements.pop();
                                const newPathName = `${elements.join('/')}/${key}`
                                push(newPathName); 
                                setDisplayHistory(false)}}>
                                <p>Date: {value.createdAt}</p>
                                <p>Message: {value.messages[0].text}</p>
                                {
                                    value.personality && <p>Personality: {value.personality}</p>
                                }
                            </div>
                        )
                    })
                }
            </div>
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
        <div className="headerContainer">
        <img src={icon.src} alt="icon" width={50} height={50}/>
        {
            isChatPage && <button className="headerButton" onClick={handleDisplayStory}>History</button>
        }
        </div>

        <nav className="flex space-x-6">
        <Link href="/">Home</Link>
        </nav>
      </header>
        </div>
    )
};