import { messageFromBackend } from "./fetchMessages"

export interface userData {
    uid: string,
    userName: string,
    email: string,
    messages: string[]
}

export type userDataSliceType = {
    loading: boolean,
    error: null | string,
    authUserInfo: {
        isAuth: boolean,
        userData: userData | null,
        messages: Record<string, messageFromBackend> | null,
    },
}
export interface message {
    sender: string,
    text: string    
}