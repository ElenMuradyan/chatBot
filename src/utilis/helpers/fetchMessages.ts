import { db } from "@/services/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { CHATBOT_PERSONALITIES, FIRESTORE_PATH_NAMES } from "../constants";
import { message } from "@/types/userData";
import { notification } from "antd";
import { addMessageInterface, fetchMessagesDataInterface, fetchMessagesInterface, Personality, updateMessageInterface } from "@/types/fetchMessages";

export async function fetchMessages ({uid, collectionName, chatId}: fetchMessagesInterface) {
    try{
        const messageRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, chatId);
        const message = await getDoc(messageRef);
        if (message.data()){    
            const messageData = message.data() as fetchMessagesDataInterface;   
            const { messages, personality } = messageData;
            return { messages, personality };
        }else{
            return null;
        }
    }catch{
        return null;
    }
};


export async function addMessagesDoc ({uid, personality, collectionName, messages}: addMessageInterface) {
    try{        
        const collectionRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName);
        const message = await addDoc(collectionRef, {messages, personality, createdAt: (new Date()).toLocaleDateString('en-GB').replace(/\//g, '.')});     
        return message.id;
    }catch(err: any){
        console.log(err.message);
    }
};

export async function updateMessagesDoc ({uid, collectionName, messages, id}: updateMessageInterface) {
    try{
        const collectionRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, id);
        await updateDoc(collectionRef, {messages}); 
    }catch{
        notification.error({
            message: 'Something is wrong.'
        })
    }
};