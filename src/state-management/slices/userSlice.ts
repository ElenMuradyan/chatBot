import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userData, userDataSliceType } from "@/types/userData";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { doc, getDoc } from "firebase/firestore";

const initialState: userDataSliceType = {
    loading: true,
    error: null,
    authUserInfo: {
        isAuth: false,
        userData: null,
    },
};


export const fetchUserData = createAsyncThunk(
    "users/fetchUserData",
    async (_, { dispatch }) => {
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
                            resolve(null);
                        }
                    })
                }else{
                    reject('Ինչ որ բան սխալ գնաց։');
                }
          });
        });
    }
);
    
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
    }
});

export const { changeLoading, setIsAuth } = userDataSlice.actions;
export default userDataSlice.reducer;