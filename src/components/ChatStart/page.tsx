import { ChatStartInterface, Personality } from "@/types/fetchMessages";
import { CHATBOT_PERSONALITIES } from "@/utilis/constants";

export default function ChatStart ({setPersonality}: ChatStartInterface) {
    return(
        <div className="messagesContainer">
            <div className="chatStartContainer">
            <h1>HI, IM Z-AI-CHATBOT. SELECT MY PERSONALITY OR START CHATTING WITH THE DEFAULT ONE.</h1>
            <div className="scrollWrapper">
            <div className="buttonContainer infiniteScroll">
            {
                Object.keys(CHATBOT_PERSONALITIES).map((item, idx) => {
                    return(
                        <button className="personalityButton" key={idx} onClick={() => setPersonality(item as Personality)}>{item}</button>
                    )
                })
            }
            </div>
            </div>
        </div>
        </div>
    )
}