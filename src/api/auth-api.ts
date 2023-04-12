import { AxiosResponse } from "axios"
import { RegistrationInputState, LoginInputState } from "components/Forms/utils/types"
import { instance } from "./api"
import { LoginResponseData, User, RefreshResponseData, Token, RegistrationResponseData, ConfirmResetPassword, ResetPasswordResponseData, ChangePassword } from "./types"


export const authApi = {
    async registerUser(userInput: RegistrationInputState) {        
        let response: AxiosResponse<RegistrationResponseData>
        try {
            response = await instance.post<RegistrationResponseData>("auth/registration/", userInput)
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async activated(email: string) {
        let response: AxiosResponse
        try {
            response = await instance.post("auth/activated/", { email })
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async loginUser(userInput: LoginInputState) {
        let response: AxiosResponse<LoginResponseData<User>>
        try {
            response = await instance.post<LoginResponseData<User>>("auth/login/", userInput)
            
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async refreshToken(refresh: string) {
        let response: AxiosResponse<Token>
        try {
            response = await instance.post<Token>(`auth/login/refresh/`, { refresh })
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async logoutUser(refresh: string) {
        let response: AxiosResponse<RefreshResponseData>
        try {
            response = await instance.post<RefreshResponseData>("auth/logout/", { refresh })
        } catch (error: any) {
            response = error.response
        }
        return response
    },    
    async forgetPassword(email: string) {
        let response: AxiosResponse<ResetPasswordResponseData>
        try {
            response = await instance.post<ResetPasswordResponseData>("auth/password/reset/", { email })
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async confirmResetPassword(confirmData: ConfirmResetPassword) {
        let response: AxiosResponse
        try {
            response = await instance.post("auth/password/reset/confirm/", confirmData)
            return response
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async changePassword(changePasswordData: ChangePassword) {
        let response: AxiosResponse
        try {
            response = await instance.post("auth/password/set/", changePasswordData)
            return response
        } catch (error: any) {
            response = error.response
        }
        return response
    }
}