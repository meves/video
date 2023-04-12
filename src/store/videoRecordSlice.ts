import { AppDispatch, GetState, RootState } from './redux-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Described, RecordedVideos, RecordingState } from './types';
import { setAfterFirstVideoModalOpen, setAfterSecondVideoModalOpen, setAfterThirdVideoModalOpen } from './modalSlice';
import { recordsApi } from 'api/records-api';
import { ResultCodes } from 'api/codes';
import { Record, Records } from 'api/types';


interface VideoRecordState {
    recordingState: RecordingState
    stream: MediaStream | null
    describedSide: Described
    order: boolean
    videoNumber: number
    seriesNumber: number
    recordedVideos: File[],
    savedVideos: Records | null
    currentPage: number
    watchedVideo: Record | null
}

const initialState: VideoRecordState = {
    recordingState: {
        preparing: false,
        recording: false,
        stopping: false,
        playing: false,
        pausing: false,
        ended: false
    },
    stream: null,
    describedSide: Described.POSITIVE,
    order: true,
    videoNumber: 1,
    seriesNumber: 1,
    recordedVideos: [],
    savedVideos: null,
    currentPage: 1,
    watchedVideo: null
}

export const videoRecordSlice = createSlice({
    name: "videoRecord",
    initialState,
    reducers: {
        setPreparingVideo: (state, action: PayloadAction<boolean>) => {
            state.recordingState.preparing = action.payload
        },
        setRecordingVideo: (state, action: PayloadAction<boolean>) => {
            state.recordingState.recording = action.payload
        },
        setStoppingVideo: (state, action: PayloadAction<boolean>) => {
            state.recordingState.stopping = action.payload
        },
        setPlayingVideo: (state, action: PayloadAction<boolean>) => {
            state.recordingState.playing = action.payload
        },
        setPausingVideo: (state, action: PayloadAction<boolean>) => {
            state.recordingState.pausing = action.payload
        },
        setEndedVideo: (state, action: PayloadAction<boolean>) => {
            state.recordingState.ended = action.payload
        },
        setStream: (state, action: PayloadAction<MediaStream| null>) => {
            state.stream = action.payload
        },
        setDescribedSide: (state, action: PayloadAction<Described>) => {
            state.describedSide = action.payload
        },
        setOrder: (state, action: PayloadAction<boolean>) => {
            state.order = action.payload
        },
        setVideoNumber: (state, action: PayloadAction) => {
            state.videoNumber = state.videoNumber + 1
        },
        resetVideoNumber: (state, action: PayloadAction) => {
            state.videoNumber = 1
        },
        setSeriesNumber: (state, action: PayloadAction) => {
            state.seriesNumber = state.seriesNumber + 1
        },
        resetSeriesNumber: (state, action: PayloadAction) => {
            state.seriesNumber = 1
        },
        setRecordedVideo: (state, action: PayloadAction<File>) => {
            state.recordedVideos = [...state.recordedVideos, action.payload]            
        },
        resetRecordedVideos: (state, action: PayloadAction) => {
            state.recordedVideos = []
        },
        setSavedVideos: (state, action: PayloadAction<Records | null>) => {
            state.savedVideos = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setWatchedVideo: (state, action: PayloadAction<Record | null>) => {
            state.watchedVideo = action.payload
        },
        setComment: (state, action: PayloadAction<string>) => {
            if (state.watchedVideo?.comment) {
                state.watchedVideo.comment = action.payload
            }
        }
    }
})

export const { 
    setPreparingVideo,
    setRecordingVideo,
    setStoppingVideo,
    setPlayingVideo,
    setPausingVideo,
    setEndedVideo,
    setStream,
    setDescribedSide,
    setOrder,
    resetRecordedVideos,
    setVideoNumber,
    resetVideoNumber,
    setSeriesNumber,
    resetSeriesNumber,
    setRecordedVideo,
    setSavedVideos,
    setCurrentPage,
    setWatchedVideo,
    setComment

} = videoRecordSlice.actions

export type ActionType = typeof setStream

export default videoRecordSlice.reducer

export const selectPreparingVideo = (state: RootState) => state.videoRecord.recordingState.preparing
export const selectRecordingVideo = (state: RootState) => state.videoRecord.recordingState.recording
export const selectStoppingVideo = (state: RootState) => state.videoRecord.recordingState.stopping
export const selectPlayingVideo = (state: RootState) => state.videoRecord.recordingState.playing
export const selectPausngVideo = (state: RootState) => state.videoRecord.recordingState.pausing
export const selectEndedVideo = (state: RootState) => state.videoRecord.recordingState.ended
export const selectStream = (state: RootState) => state.videoRecord.stream
export const selectDescribedSide = (state: RootState) => state.videoRecord.describedSide
export const selectVideoNumber = (state: RootState) => state.videoRecord.videoNumber
export const selectSeriesNumber = (state: RootState) => state.videoRecord.seriesNumber
export const selectRecordedVideos = (state: RootState) => state.videoRecord.recordedVideos
export const selectSavedVideos = (state: RootState) => state.videoRecord.savedVideos
export const selectCurrentPage = (state: RootState) => state.videoRecord.currentPage
export const selectWatchedVideo = (state: RootState) => state.videoRecord.watchedVideo


export const sendRecordedVideosThunk = () =>
    async (dispatch: AppDispatch, getState: GetState) => {
        
        const order = getState().videoRecord.order
        const storedRecordedVideos = getState().videoRecord.recordedVideos
        
        const recordedVideos: RecordedVideos = {
            positive_video: order ? storedRecordedVideos[0] : storedRecordedVideos[1],
            negative_video: order ? storedRecordedVideos[1] : storedRecordedVideos[0],
            end_video: storedRecordedVideos[2],
            theme: getState().theme.theme?.id as number,
        }
        
        const response = await recordsApi.saveRecordedVideos(recordedVideos)        
        dispatch(setDescribedSide(Described.POSITIVE))
        dispatch(setOrder(true))
        dispatch(resetRecordedVideos())
        if (response.status === ResultCodes.CREATED_201) {
            return undefined
        } else {            
            return Promise.reject()
        }
    }

export const getSavedVideosThunk = (page: number) =>
    async (dispatch: AppDispatch) => {
        const response = await recordsApi.getSavedVideos(page)
        if (response.status === ResultCodes.SUCCESS_200) {
            dispatch(setSavedVideos(response.data))
        }
    }

export const getWatchedVideoThunk = (recordId: number) =>
    async (dispatch: AppDispatch) => {
        const response = await recordsApi.getWatchedVideo(recordId)
        if (response.status === ResultCodes.SUCCESS_200) {
            dispatch(setWatchedVideo(response.data))
            return undefined
        }    
    }

export const setRecordedVideoThunk = (videoFile: File) =>
    async (dispatch: AppDispatch, getState: GetState) => {
        dispatch(setRecordedVideo(videoFile))
        const videoNumber = getState().videoRecord.videoNumber
        const seriesNumber = getState().videoRecord.seriesNumber
        if (videoNumber < 3) {
            dispatch(setVideoNumber())
            dispatch(setDescribedSideThunk())            
        }
        if (videoNumber === 3 && seriesNumber <= 3) {
            dispatch(setPausingVideo(true))
            dispatch(sendRecordedVideosThunk())
            dispatch(showModalAfterSeriesThunk(seriesNumber))
                // .then(() => {
                // })
                // .catch((error: any) => {
                //     dispatch(setVideoNotSentModalOpen(true))
                // })
        }
    }


export const showModalAfterSeriesThunk = (seriesNumber: number) =>
    async (dispatch: AppDispatch) => {
        switch (seriesNumber) {
            case 1:
                dispatch(setAfterFirstVideoModalOpen(true))
                break
            case 2:
                dispatch(setAfterSecondVideoModalOpen(true))
                break
            case 3:
                dispatch(setAfterThirdVideoModalOpen(true))
                break
            default:
                return
        }
        dispatch(setSeriesNumber())
        return
    } 

export const setDescribedSideThunk = () =>
    async (dispatch: AppDispatch, getState: GetState) => {
        const videoNumber = getState().videoRecord.videoNumber
        let described: Described 
        switch (videoNumber) {
            case 1:
                described = (Math.floor(Math.random() * 10) % 2) === 0 ? Described.POSITIVE : Described.NEGATIVE
                const order = described === Described.POSITIVE ? true : false
                dispatch(setDescribedSide(described))
                dispatch(setOrder(order))
                break
            case 2:
                const describedSide = getState().videoRecord.describedSide
                described = describedSide === Described.POSITIVE ? Described.NEGATIVE : Described.POSITIVE
                dispatch(setDescribedSide(described))
                break
            case 3:
                dispatch(setDescribedSide(Described.TOTAL))
                break
            default:
                break
        }
    }

export const saveComment = (id: number, comment: string) => 
    async (dispatch: AppDispatch) => {
        const response = await recordsApi.changeComment(id, comment)
        if (response.status === ResultCodes.SUCCESS_200) {
            dispatch(setComment(response.data.comment))
            return undefined
        }
    }