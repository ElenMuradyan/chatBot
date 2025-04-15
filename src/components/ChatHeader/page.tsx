'use client'
import Image from "next/image";
import icon from '../../app/favicon.ico';
import { useSelector } from "react-redux";
import { RootState } from "@/state-management/store";
import { usePathname, useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utilis/constants";
import { useState } from "react";
import { BackwardOutlined } from "@ant-design/icons";

import '../../styles/header.css';

export default function ChatHeader () {
    const { messages } = useSelector((state: RootState) => state.userData.authUserInfo);
    const { push } = useRouter();
    const [ displayHistory, setDisplayHistory ] = useState<boolean>(false);
      const pathName = usePathname();
      const isChatPage = pathName.includes(ROUTE_PATHS.AIPOWEREDCHATBOT);
    
    
    return(
        <div className="chatHeaderContainer">
         <div className={`historyContainer ${displayHistory ? 'show' : ''}`} > 
                <h1>History</h1>
                <button className="headerButton" onClick={() => setDisplayHistory(false)}><BackwardOutlined />Back to chat</button>
                {
                   messages && Object.entries(messages).map(([key, value], idx) => {
                        return(
                            <div key={idx} className="historyItem" onClick={() => {push(`${ROUTE_PATHS.AIPOWEREDCHATBOT}/${key}`); setDisplayHistory(false)}}>
                                <p>Date: {value.createdAt}</p>
                                <p>Message: {value.messages[0].text}</p>
                                <p>Personality: {value.personality}</p>
                            </div>
                        )
                    })
                }
            </div>
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
        <div className="headerContainer">
        <Image src={icon} alt="icon" width={50}/>
        {
            isChatPage && <button className="headerButton" onClick={() => setDisplayHistory(true)}>History</button>
        }
        </div>

        <nav className="flex space-x-6">
          <a href="/">Home</a>
        </nav>
      </header>
        </div>
    )
};