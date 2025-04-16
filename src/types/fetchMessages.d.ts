import { CHATBOT_PERSONALITIES } from "@/utilis/constants"
import { message } from "./userData";

export type Personality = keyof typeof CHATBOT_PERSONALITIES;

export interface ChatStartInterface {
    setPersonality: (val: Personality) => void;
};

export interface fetchMessagesInterface {
    uid: string, 
    collectionName: string, 
    chatId: string,
    functionName?: string
}

export interface fetchMessagesDataInterface {
    messages: message[],
    personality: Personality,
}

export interface addMessageInterface {
    uid: string, 
    personality?: Personality, 
    collectionName: string, 
    messages: message[],
    functionName?: string
}

export interface updateMessageInterface {
    uid: string, 
    collectionName: string,
    messages: message[], 
    id: string,
    functionName?: string
}

export interface formatMessagesForOpenRouterInterface {
    messages: message[], 
    personality?: Personality 
}

export interface messageFromBackend {
    messages: message[], 
    personality?: Personality,
    createdAt: string,
}