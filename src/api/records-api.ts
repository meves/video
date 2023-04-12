import { AxiosResponse } from "axios"
import { instance } from "./api"
import { RecordedVideos } from "store/types"
import { Comment, Record, Records } from "./types"

export const recordsApi = {
    async saveRecordedVideos(recordedVideos: RecordedVideos) {
        const formData: FormData = new FormData()
        formData.append("positive_video", recordedVideos.positive_video)
        formData.append("negative_video", recordedVideos.negative_video)
        formData.append("end_video", recordedVideos.end_video)
        formData.append("theme", String(recordedVideos.theme))
        let response: AxiosResponse
        try {
            response = await instance.post("records/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }})
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async getSavedVideos(page: number) {
        let response: AxiosResponse<Records>
        try {
            response = await instance.get<Records>(`records/?page=${page}`)
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async getWatchedVideo(id: number) {
        let response: AxiosResponse<Record>
        try {
            response = await instance.get<Record>(`records/${id}/`)
        } catch (error: any) {
            response = error.response
        }
        return response
    },
    async changeComment(id: number, comment: string) {
        let response: AxiosResponse<Comment>
        try {
            response = await instance.patch<Comment>(`records/${id}/`, { comment })
        } catch (error: any) {
            response = error.response
        }
        return response
    }
}