import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultCodes } from "api/codes";
import { themeApi } from "api/theme-api";
import { AppDispatch, RootState } from "./redux-store";
import { Theme } from "./types";
import { NOT_CREDENTIALS } from "./constants/errors-constants";

interface ThemeState {
    theme: Theme | null
}

const initialState: ThemeState = {
    theme: null
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

export const selectTheme = (state: RootState) => state.theme.theme

export const getThemeThunk = () =>
    async (dispatch: AppDispatch) => {
        const response  = await themeApi.getTheme()
        if (response.status === ResultCodes.SUCCESS_200) {
            dispatch(setTheme(response.data))
            return undefined
        } else if (response.status === ResultCodes.UNAUTHORIZED_401 || response.status === ResultCodes.FORBIDDEN_403) {
            return NOT_CREDENTIALS
        } 
    }