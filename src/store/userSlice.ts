import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserFullName } from "api/types";
import { AppDispatch, RootState } from "./redux-store";
import { lkApi } from "api/lk-api";
import { ResultCodes } from "api/codes";
import { deleteFromLocalStorage, deleteUserData, parseDeleteAccountResponseError, parseUpdateUserNameresponseError } from "./utils";
import { ACTIVATED } from "./constants/local-storage-constants";

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setUserFullName: (state, action: PayloadAction<UserFullName>) => {
            if (state.user) {
                state.user.first_name = action.payload.first_name
                state.user.last_name = action.payload.last_name
            }
        }
    }
})

export const { setUser, setUserFullName } = userSlice.actions

export default userSlice.reducer

export const selectUser = (state: RootState) => state.user.user

export const updateUserNameThunk = (id: number, userFullName: UserFullName) =>
    async (dispatch: AppDispatch) => {
        const response = await lkApi.updateUserName(id, userFullName)
        if (response.status === ResultCodes.SUCCESS_200) {
            dispatch(setUserFullName(response.data))
            return undefined
        } else {
            return parseUpdateUserNameresponseError(response.status)
        }
    }

export const deleteUserAccountThunk = (userId: number) => 
    async (dispatch: AppDispatch) => {
        const response = await lkApi.deleteUserAccount(userId)
        if (response.status === ResultCodes.NO_CONTENT_204) {
            deleteUserData(dispatch)
            deleteFromLocalStorage(ACTIVATED)
            return undefined
        } else {
            return parseDeleteAccountResponseError(response.status)
        }
    }