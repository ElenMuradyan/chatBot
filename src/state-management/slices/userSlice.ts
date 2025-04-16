import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userData, userDataSliceType } from "@/types/userData";
import { db } from "@/services/firebase";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Cookies from 'js-cookie';
import { messageFromBackend } from "@/types/fetchMessages";

const initialState: userDataSliceType = {
    loading: true,
    error: null,
    authUserInfo: {
        isAuth: Cookies.get('isAuth') === 'true',
        userData: null,
        messages: null,
    },
};

export const fetchUserData = createAsyncThunk(
    "users/fetchUserData",
    async (_, { rejectWithValue }) => {
        try{
            const isAuth = Cookies.get('isAuth') === 'true';
            const uid = Cookies.get('uid');
                if(isAuth && uid){
                    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
                    const user = await getDoc(userRef);
                    if(user.exists()){
                        const userInfo = {
                            userData: user.data() as userData,
                            isAuth: isAuth
                        }
                        return userInfo;
                    }else{
                        throw new Error("User not found");
                    }
                }else{
                    throw new Error("Not authenticated");
                }
        }catch(error: any){
            rejectWithValue(error.message);
        }    
    }
);

export const messagesHistory = createAsyncThunk(
    'users/fetchHistory',
    async ({collectionName, uid, functionName}: {collectionName: string, uid: string, functionName?: string}) => {        
        const history = functionName ? collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, functionName, FIRESTORE_PATH_NAMES.THREADS) : collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName);
        const historySnapshot = await getDocs(history);
        let messages: Record<string, messageFromBackend> = {};        
        historySnapshot.docs.forEach(doc => {messages[doc.id] = doc.data() as messageFromBackend});      
        console.log(messages)          
        return messages;   
    }
)
    
const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsAuth: (state, action) => {
            state.authUserInfo.isAuth = action.payload
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchUserData.pending, (state) => {
            state.authUserInfo.userData = null;
            state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {                        
            state.loading = false;
            if(action.payload?.userData && action.payload.isAuth){
                state.authUserInfo.userData = action.payload.userData;
                state.authUserInfo.isAuth = action.payload.isAuth;
            }
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.authUserInfo.isAuth = false;
        })
        .addCase(messagesHistory.fulfilled, (state, action) => {
            state.authUserInfo.messages = action.payload;
        })
        .addCase(messagesHistory.rejected, (state) => {
            state.authUserInfo.messages = null;
        })
    }
});

export const { changeLoading, setIsAuth } = userDataSlice.actions;
export default userDataSlice.reducer;