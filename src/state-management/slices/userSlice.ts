import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userData, userDataSliceType } from "@/types/userData";
import { db } from "@/services/firebase";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { messageFromBackend } from "@/types/fetchMessages";
import { getIsAuth } from "@/utilis/helpers/getIsAuth";

const initialState: userDataSliceType = {
    loading: false,
    error: null,
    authUserInfo: {
        isAuth: false,
        userData: null,
        messages: null,
    },
};

export const fetchUserData = createAsyncThunk(
    "users/fetchUserData",
    async (_, { rejectWithValue }) => {
        try{
            const { uid: uidValue, isAuth: isAuthValue} = await getIsAuth();

            const uid = uidValue.value;
            const isAuth = isAuthValue;

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
           return rejectWithValue(error.message);
        }    
    }
);

export const messagesHistory = createAsyncThunk(
    'users/fetchHistory',
    async ({collectionName, functionName}: {collectionName: string, functionName?: string}) => {  
        const { uid: uidValue } = await getIsAuth();
      
        const uid = uidValue.value;

        if(uid){            
            const history = functionName ? collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName, functionName, FIRESTORE_PATH_NAMES.THREADS) : collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName);
            const historySnapshot = await getDocs(history);            
            let messages: Record<string, messageFromBackend> = {};        
            historySnapshot.docs.forEach(doc => {messages[doc.id] = doc.data() as messageFromBackend});      
            return messages;       
        }else{
            return null;
        }
    }
)
    
const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.authUserInfo.isAuth = action.payload;
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