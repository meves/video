import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NOT_FOUND, SOME_ERROR } from "./constants/errors-constants"
import { RootState } from "./redux-store"

interface ErrorState {
    error_400_initialText: string
    error_500_initialText: string
    error_400: string
    error_500: string
}

const initialState: ErrorState = {
    error_400_initialText: NOT_FOUND,
    error_500_initialText: SOME_ERROR,
    error_400: "",
    error_500: ""
}

export const ErrorSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setError_400: (state, action: PayloadAction<string>) => {
            state.error_400 = action.payload
        },
        setError_500: (state, action: PayloadAction<string>) => {
            state.error_500 = action.payload
        }
    }
})

export const { setError_400, setError_500 } = ErrorSlice.actions

export default ErrorSlice.reducer

export const selectError_400 = (state: RootState) => state.errors.error_400
export const selectError_500 = (state: RootState) => state.errors.error_500
export const selectError_400_InitialText = (state: RootState) => state.errors.error_400_initialText
export const selectError_500_InitialText = (state: RootState) => state.errors.error_500_initialText