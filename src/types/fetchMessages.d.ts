import { CHATBOT_PERSONALITIES } from "@/utilis/constants"
import { message } from "./userData";

export type Personality = keyof typeof CHATBOT_PERSONALITIES;

export interface ChatStartInterface {
    setPersonality: (val: Personality) => void;
};

export interface fetchMessagesInterface {
    collectionName: string, 
    chatId: string,
    functionName?: string
}

export interface fetchMessagesDataInterface {
    messages: message[],
    personality: Personality,
}

export interface addMessageInterface {
    personality?: Personality, 
    collectionName: string, 
    messages: message[],
    functionName?: string
}

export interface updateMessageInterface {
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