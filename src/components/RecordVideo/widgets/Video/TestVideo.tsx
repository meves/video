import React, { useCallback, useEffect, useMemo, useRef } from "react"
import styles from "./Video.module.scss"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { 
    selectPausngVideo, 
    selectPlayingVideo, 
    selectRecordingVideo, 
    selectStoppingVideo, 
    selectStream, 
    setEndedVideo, 
    setPausingVideo, 
    setPlayingVideo
} from "store/videoRecordSlice"


export const TestVideo = () => {
    const recordedData: Blob[] = useMemo(() => [], [])
    let currentTimeRef = useRef<number>()
    let objectUrlRef = useRef<string>()

    const videoRef = useRef<HTMLVideoElement>(null)
    const mediaRecorderRef  = useRef<MediaRecorder>()
    const blobRef = useRef<Blob>()

    const dispatch = useAppDispatch()

    const recording = useAppSelector(selectRecordingVideo)
    const stopping = useAppSelector(selectStoppingVideo)
    const playing = useAppSelector(selectPlayingVideo)
    const pausing = useAppSelector(selectPausngVideo)

    const stream = useAppSelector(selectStream)

    // RECORDING
    const playMediaInHTMLVideoElement = useCallback(async () => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
        }            
    }, [stream])
    
    const recordMediaToMediaRecorder = useCallback(() => {
        if (stream) {
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" })            
            mediaRecorderRef.current.start()
        }
    }, [stream])
    
    useEffect(() => {
        if (recording) {
            playMediaInHTMLVideoElement()
            recordMediaToMediaRecorder()
        }
    }, [recording, playMediaInHTMLVideoElement, recordMediaToMediaRecorder])

    // STOPPING
    const getDataToMediaRecorder = useCallback((event: BlobEvent) => {
        recordedData.push(event.data)
        blobRef.current = new Blob(recordedData, { type: "video/webm" })
        objectUrlRef.current = URL.createObjectURL(blobRef.current)
    }, [recordedData])

    const stopMedia = useCallback(() => {        
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current?.stop()
            mediaRecorderRef.current.addEventListener("dataavailable", getDataToMediaRecorder)
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }        
    }, [getDataToMediaRecorder])

    useEffect(() => {
        if (stopping) {
            stopMedia()
        }
    }, [stopping, stopMedia, recordedData])

    // PLAYING
    const playMedia = useCallback(() => {
        if (videoRef.current && objectUrlRef.current) { 
            if (!videoRef.current.src) {
                videoRef.current.src = objectUrlRef.current  
                videoRef.current.muted = false
                videoRef.current.volume = 0.5
                
            }
            if (currentTimeRef.current) {
                videoRef.current.currentTime = currentTimeRef.current
            }
            videoRef.current?.play()
        }
    }, [])

    useEffect(() => {
        if (playing) {
            playMedia()
        }
    }, [playing, playMedia])

    // PAUSING
    const pauseMedia = useCallback(() => {
        videoRef.current?.pause()
        currentTimeRef.current = videoRef.current?.currentTime
    }, [])
    useEffect(() => {
        if (pausing) {
            pauseMedia()
        }        
    }, [pausing, pauseMedia])

    // ENDED
    useEffect(() => {
        return () => {
            dispatch(setEndedVideo(false))
        }
    }, [dispatch])

    const endedVideoHandler = useCallback(function() {
        dispatch(setPlayingVideo(false))
        dispatch(setPausingVideo(false))
        dispatch(setEndedVideo(true))
        if (videoRef.current) {
            videoRef.current.src = ""
            blobRef.current = undefined
            mediaRecorderRef.current = undefined
        }
    }, [dispatch])

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current
            video.addEventListener("ended", endedVideoHandler) 
            return () => {
                video.removeEventListener("ended", endedVideoHandler)
                mediaRecorderRef.current?.addEventListener("dataavailable", getDataToMediaRecorder)
            }
        }
    }, [dispatch, endedVideoHandler, getDataToMediaRecorder])

    return (
        <video
            ref={videoRef}
            className={styles.video}
            muted
            poster="../../../assets/images/video/Rectangle.png"
            autoPlay={false}
            loop={false}
        />
    )
}