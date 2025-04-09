import { message } from "./userData";

export interface chatInterface {
    messages: message[], 
    loading: boolean, 
    input: string, 
    setInput: (val: string) => void, 
    sendMessage: () => void,
}