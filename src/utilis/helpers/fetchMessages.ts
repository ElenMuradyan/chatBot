import { db } from "@/services/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../constants";
import { message } from "@/types/userData";
import { notification } from "antd";

export async function fetchMessages ({uid, collectionName, chatId}: {uid: string, collectionName: string, chatId: string}) {
    try{
        const messageRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, chatId);
        const message = await getDoc(messageRef);
        if (message.data()){    
            const messages:Record<string, message[]> = message.data() as Record<string, message[]> ;   
            return messages.messages as message[];
        }else{
            return [
                {sender: 'bot', text: 'Hi, how can I assist you.'}
            ];
        }
    }catch{
        return [
            {sender: 'bot', text: 'Hi, how can I assist you.'}
        ];
    }
};


export async function addMessagesDoc ({uid, collectionName, messages}: {uid: string, collectionName: string, messages: message[]}) {
    try{        
        const collectionRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName);
        const message = await addDoc(collectionRef, {messages});     
        return message.id;
    }catch(err: any){
        console.log(err.message);
    }
};

export async function updateMessagesDoc ({uid, collectionName, messages, id}: {uid: string, collectionName: string, messages: message[], id: string}) {
    try{
        const collectionRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, id);
        await updateDoc(collectionRef, {messages}); 
    }catch{
        notification.error({
            message: 'Something is wrong.'
        })
    }
};