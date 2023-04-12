import { getFromLocalStorage, saveToLocalStorage } from "store/utils"
import axios, { 
    AxiosError, 
    AxiosInstance, 
    InternalAxiosRequestConfig,
    AxiosResponse
} from "axios"
import { Token } from "./types"
import { ResultCodes } from "./codes"
import { JWT_TOKEN } from "store/constants/local-storage-constants"
import { baseURL } from "./api"


const onRequest = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    const storedToken = getFromLocalStorage<Token>(JWT_TOKEN)
    if (storedToken) {
        config.headers && (config.headers["Authorization"] = `JWT ${storedToken.access}`)
    }
    return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response
}

const onResponseError = async (error: AxiosError) => {
    const response = error.response as AxiosResponse<{detail: string}>
    if (response) {
        if (
            (response.status === ResultCodes.UNAUTHORIZED_401 || response.status === ResultCodes.FORBIDDEN_403)
            && response.data.detail === "Учетные данные не были предоставлены."
        ) {
            const token = getFromLocalStorage<Token>(JWT_TOKEN)
            if (token) {
                try {
                    const response = await axios.post<Token>(`${baseURL}login/refresh/`, {
                        refresh: token.refresh
                    })
                    const { access, refresh } = response.data
                    saveToLocalStorage(JWT_TOKEN, {access, refresh})
                    return
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
        return response
    }
}

export const setInterceptors = (instance: AxiosInstance): AxiosInstance => {
    instance.interceptors.request.use(onRequest, onRequestError)
    instance.interceptors.response.use(onResponse, onResponseError)  
    return instance
}