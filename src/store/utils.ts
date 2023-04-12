import { ResultCodes } from "api/codes";
import { 
    BAD_REQUEST,
    HAS_TO_LOGIN,
    NOT_ACTIVATED, 
    NOT_AUTHENTICATED, 
    NOT_CREDENTIALS,
    NOT_FOUND,
    PASSWORD_NOT_CONFIRMED,
    USER_EXISTS 
} from "./constants/errors-constants";
import { setIsAuth } from "./authSlice";
import { setUser } from "./userSlice";
import { JWT_TOKEN, USER } from "./constants/local-storage-constants";
import { AppDispatch } from "./redux-store";


export const deleteUserData = (dispatch: AppDispatch) => {
    deleteFromLocalStorage(JWT_TOKEN)
    deleteFromLocalStorage(USER)
    dispatch(setUser(null))
    dispatch(setIsAuth(false))
}

export const moveToLoginPage = () => {
    return HAS_TO_LOGIN
}

export function deleteUserDataAndMoveToLogin(dispatch: AppDispatch) {
    deleteUserData(dispatch)
    return moveToLoginPage()
} 

// parseResponseError
export const parseRegistrationResponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return USER_EXISTS
    }
}

export const parseLoginResponseError = (status: number) => {
    if (status === ResultCodes.UNAUTHORIZED_401) {
        return NOT_AUTHENTICATED
    }
}

export const parseLogoutResponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return BAD_REQUEST
    } else if (status === ResultCodes.UNAUTHORIZED_401) {
        return NOT_CREDENTIALS
    } else if (status === ResultCodes.FORBIDDEN_403) {
        return NOT_CREDENTIALS
    }
}

export const parseDeleteAccountResponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return BAD_REQUEST
    } else if (status === ResultCodes.UNAUTHORIZED_401) {
        return NOT_CREDENTIALS
    } else if (status === ResultCodes.FORBIDDEN_403) {
        return NOT_CREDENTIALS
    } else if (status === ResultCodes.NOT_FOUND_404) {
        return NOT_FOUND
    }
}

export const parseRefreshResponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return HAS_TO_LOGIN
    }
}

export const parseForgetPasswordResponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return BAD_REQUEST
    }
    if (status === ResultCodes.FORBIDDEN_403) {
        return NOT_ACTIVATED
    }
}

export const parseConfirmResetPasswordResponseError = (status: number) => {
    if (status === ResultCodes.UNAUTHORIZED_401) {
        return PASSWORD_NOT_CONFIRMED
    }
}

export const parseChangePasswordResponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return BAD_REQUEST
    } else if (
        status === ResultCodes.UNAUTHORIZED_401 ||
        status === ResultCodes.FORBIDDEN_403) {
        return PASSWORD_NOT_CONFIRMED
    }
}

export const parseUpdateUserNameresponseError = (status: number) => {
    if (status === ResultCodes.BAD_REQUEST_400) {
        return BAD_REQUEST
    } else if (
        status === ResultCodes.UNAUTHORIZED_401 ||
        status === ResultCodes.FORBIDDEN_403) {
        return NOT_CREDENTIALS
    } else if (status === ResultCodes.NOT_FOUND_404) {
        return NOT_FOUND
    }
}

export const saveToLocalStorage = (name: string, data: any): void => {
    localStorage.setItem(name, JSON.stringify(data))
}

export function getFromLocalStorage<T>(name: string): T | null {
    const data = localStorage.getItem(name)
    if (data) {
        return JSON.parse(data) as T
    }
    return null
}

export const deleteFromLocalStorage = (name: string): boolean => {
    const data = localStorage.getItem(name)
    if (data) {
        localStorage.removeItem(name)
        return true
    }
    return false
}