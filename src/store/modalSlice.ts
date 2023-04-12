import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./redux-store"

interface AuthState {
    passwordResetModalOpen: boolean
    afterPasswordRecoveryModalOpen: boolean
    emailAlreadyRegisteredModalOpen: boolean
    cookieModalOpen: boolean
    recordModalOpen: boolean
    afterFirstVideoModalOpen: boolean
    afterSecondVideoModalOpen: boolean
    afterThirdVideoModalOpen: boolean
    videoNotSentModalOpen: boolean
}

const initialState: AuthState = {
    passwordResetModalOpen: false,
    afterPasswordRecoveryModalOpen: false,
    emailAlreadyRegisteredModalOpen: false,
    cookieModalOpen: true,
    recordModalOpen: false,
    afterFirstVideoModalOpen: false,
    afterSecondVideoModalOpen: false,
    afterThirdVideoModalOpen: false,
    videoNotSentModalOpen: false
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setPasswordResetModalOpen: (state, action: PayloadAction<boolean>) => {
            state.passwordResetModalOpen = action.payload
        },
        setAfterPasswordRecoveryModalOpen: (state, action: PayloadAction<boolean>) => {
            state.afterPasswordRecoveryModalOpen = action.payload
        },
        setEmailAlreadyRegisteredModalOpen: (state, action: PayloadAction<boolean>) => {
            state.emailAlreadyRegisteredModalOpen = action.payload
        },
        setCookieModalOpen: (state, action: PayloadAction<boolean>) => {
            state.cookieModalOpen = action.payload
        },
        setRecordModalOpen: (state, action: PayloadAction<boolean>) => {
            state.recordModalOpen = action.payload
        },
        setAfterFirstVideoModalOpen: (state, action: PayloadAction<boolean>) => {
            state.afterFirstVideoModalOpen = action.payload
        },
        setAfterSecondVideoModalOpen: (state, action: PayloadAction<boolean>) => {
            state.afterSecondVideoModalOpen = action.payload
        },
        setAfterThirdVideoModalOpen: (state, action: PayloadAction<boolean>) => {
            state.afterThirdVideoModalOpen = action.payload
        },
        setVideoNotSentModalOpen: (state, action: PayloadAction<boolean>) => {
            state.videoNotSentModalOpen = action.payload
        }
    }
})

export const { 
    setPasswordResetModalOpen,
    setAfterPasswordRecoveryModalOpen,
    setEmailAlreadyRegisteredModalOpen,
    setCookieModalOpen,
    setRecordModalOpen,
    setAfterFirstVideoModalOpen,
    setAfterSecondVideoModalOpen,
    setAfterThirdVideoModalOpen,
    setVideoNotSentModalOpen

} = modalSlice.actions

export default modalSlice.reducer

export const selectPasswordResetModalOpen = (state: RootState) => state.modal.passwordResetModalOpen
export const selectAfterPasswordRecoveryModalOpen = (state: RootState) => state.modal.afterPasswordRecoveryModalOpen
export const selectEmailAlreadyRegisteredModalOpen = (state: RootState) => state.modal.emailAlreadyRegisteredModalOpen
export const selectCookieModalOpen = (state: RootState) => state.modal.cookieModalOpen
export const selectRecordModalOpen = (state: RootState) => state.modal.recordModalOpen
export const selectAfterFirstVideoModalOpen = (state: RootState) => state.modal.afterFirstVideoModalOpen
export const selectAfterSecondVideoModalOpen = (state: RootState) => state.modal.afterSecondVideoModalOpen
export const selectAfterThirdVideoModalOpen = (state: RootState) => state.modal.afterThirdVideoModalOpen
export const selectVideoNotSentModalOpen = (state: RootState) => state.modal.videoNotSentModalOpen