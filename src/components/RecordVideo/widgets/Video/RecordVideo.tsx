import React, { useCallback, useEffect, useMemo, useRef } from "react"
import styles from "./Video.module.scss"
import { 
    selectRecordingVideo,
    selectStoppingVideo,
    selectStream,
    setRecordedVideoThunk
} from "store/videoRecordSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"


export const RecordVideo = () => {
    const dispatch = useAppDispatch()

    const recordedData: Blob[] = useMemo(() => [], [])
    
    const videoRef = useRef<HTMLVideoElement>(null)
    const mediaRecorderRef  = useRef<MediaRecorder>()
    const blobRef = useRef<Blob>()
    const fileRef  = useRef<File>()
    
    const stream = useAppSelector(selectStream)
    const recording = useAppSelector(selectRecordingVideo)
    const stopping = useAppSelector(selectStoppingVideo)

    // RECORDING
    const playMedia = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
        }
    }, [stream])
    
    const startMedia = useCallback(() => {
        if (stream) {      
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" })
            mediaRecorderRef.current?.start()
        }
    }, [stream])

    useEffect(() => {
        if (recording) {
            startMedia()            
            playMedia()
        }
    }, [recording, playMedia, startMedia])

    // STOPPING
    const stopMedia = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current?.stop()
            mediaRecorderRef.current.ondataavailable = function(event: BlobEvent) {
                recordedData.push(event.data)
                blobRef.current = new Blob(recordedData, { type: "video/webm" })
                fileRef.current =  new File( [blobRef.current], `${Number(new Date())}.webm`, { type: "video/webm" })
                dispatch(setRecordedVideoThunk(fileRef.current))
            }                    
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
    }, [dispatch, recordedData])

    useEffect(() => {
        if (stopping) {
            stopMedia()
        }
    }, [stopping, stopMedia])

    // ENDED
    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.ondataavailable = null
            }
        }
    }, [])
    
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