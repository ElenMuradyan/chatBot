import { db } from "@/services/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../constants";
import { notification } from "antd";
import { addMessageInterface, fetchMessagesDataInterface, fetchMessagesInterface, updateMessageInterface } from "@/types/fetchMessages";

export async function fetchMessages ({uid, collectionName, chatId, functionName}: fetchMessagesInterface) {
    try{
        const messageRef = functionName ? doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, functionName, FIRESTORE_PATH_NAMES.THREADS, chatId) : doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, chatId);
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


export async function addMessagesDoc ({uid, personality, collectionName, messages, functionName}: addMessageInterface) {
    try{   
        console.log(uid);
             
        const collectionRef = functionName ? collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, functionName, FIRESTORE_PATH_NAMES.THREADS) : collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName);
        const message = await addDoc(collectionRef, {messages, personality: personality ?? null , createdAt: (new Date()).toLocaleDateString('en-GB').replace(/\//g, '.')});     
        return message.id;
    }catch(err: any){
        console.log(err.message);
    }
};

export async function updateMessagesDoc ({uid, collectionName, messages, id, functionName}: updateMessageInterface) {
    try{
        const collectionRef = functionName ? doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, functionName, FIRESTORE_PATH_NAMES.THREADS, id) : doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, id);
        await updateDoc(collectionRef, {messages}); 
    }catch{
        notification.error({
            message: 'Something is wrong.'
        })
    }
};