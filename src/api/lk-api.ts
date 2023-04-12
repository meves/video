import { AxiosResponse } from "axios"
import { instance } from "./api"
import { UserFullName } from "./types"


export const lkApi = {
    async updateUserName(id: number, userFullName: UserFullName) {
        let response: AxiosResponse<UserFullName>
        try {
            response = await instance.patch(`lk/${id}/`, userFullName)
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async deleteUserAccount(id: number) {
        let response: AxiosResponse
        try {
            response = await instance.delete(`lk/${id}/`)
        } catch (error: any) {
            response = error.response
        }
        return response
    }
}