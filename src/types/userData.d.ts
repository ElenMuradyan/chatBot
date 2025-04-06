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
    },
}