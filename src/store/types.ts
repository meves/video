export type ActivationEmail = { email: string }

export type Activated = { result: boolean }

export type ConfirmResetPasswordThunkType = {
    new_password: string
    re_new_password: string
}

export type ResetPassword = {
    uid: string
    token: string
}

export type Category = {
    name: string
    translate: string
}

export type Theme = {
    id: number,
    word: string
    translate: string
    image_uri: string
    image_author: string
    category: Category
}

export type RecordingState = {
    preparing: boolean
    recording: boolean
    stopping: boolean
    playing: boolean
    pausing: boolean
    ended: boolean
}

export enum Langs {
    RU = "RU",
    EN = "EN"
}

export enum Described {
    POSITIVE = "POSITIVE",
    NEGATIVE = "NEGATIVE",
    TOTAL = "TOTAL"
}

export type RecordedVideos = {
    positive_video: File
    negative_video: File
    end_video: File
    theme: number
}