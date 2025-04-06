import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        userData: userDataSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;