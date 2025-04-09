import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message, userData, userDataSliceType } from "@/types/userData";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Cookies from 'js-cookie';

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
    async (_, { dispatch, rejectWithValue }) => {
        return new Promise<userData | null>((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    dispatch(changeLoading(true));
                    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, user.uid);
                    getDoc(userRef)
                    .then((userData) => {
                        if(userData.exists()){
                            const data = userData.data();
                            resolve(data as userData)
                        }else{
                            rejectWithValue('Ինչ որ բան սխալ գնաց։');
                        }
                    })
                }else{
                    rejectWithValue('Ինչ որ բան սխալ գնաց։');
                }
          });
        });
    }
);

export const messagesHistory = createAsyncThunk(
    'users/fetchHistory',
    async ({collectionName, uid}: {collectionName: string, uid: string}) => {
        const history = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid, collectionName);
        const historySnapshot = await getDocs(history);
        let messages: Record<string, message[]> = {};
        historySnapshot.docs.forEach(doc => {messages[doc.id] = doc.data() as message[]});        
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
            state.authUserInfo.isAuth = true;
            state.authUserInfo.userData = action.payload;            
            state.loading = false;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.authUserInfo.isAuth = false;
        })
        .addCase(messagesHistory.fulfilled, (state, action) => {
            state.authUserInfo.messages = action.payload
        })
        .addCase(messagesHistory.rejected, (state) => {
            state.authUserInfo.messages = null;
        })
    }
});

export const { changeLoading, setIsAuth } = userDataSlice.actions;
export default userDataSlice.reducer;