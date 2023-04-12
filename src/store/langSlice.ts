import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "./redux-store"
import { Langs } from "./types"

interface LangState {
    lang: Langs
}

const initialState: LangState = {
    lang: Langs.RU
}

export const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<Langs>) => {
            state.lang = action.payload
        }
    }
})

export const { setLang } = langSlice.actions

export default langSlice.reducer

export const selectLang = (state: RootState) => state.lang.lang

export const setLangThunk = (lang: Langs) => 
    async (dispatch: AppDispatch) => {
        // create request to set lang or use library
        dispatch(setLang(lang))
    }