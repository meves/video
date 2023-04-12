import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./redux-store"
import { activatedThunk } from "./authSlice"

interface AppState {
    initialized: boolean
}

const initialState: AppState = {
    initialized: false
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.initialized = action.payload
        }
    }
})

export const { setInitialized } = appSlice.actions

export default appSlice.reducer

export const selectInitialized = (state: RootState) => state.app.initialized


export const initializeAppThunk = () => 
    async (dispatch: AppDispatch) => {
        const promises = []
        promises.push(dispatch(activatedThunk()))
        try {
            await Promise.all(promises)
            dispatch(setInitialized(true))
        } catch(error) {
            dispatch(setInitialized(false))
            return Promise.reject(error)
        }
    }