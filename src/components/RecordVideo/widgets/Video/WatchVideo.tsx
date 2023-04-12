import React, { useCallback, useEffect, useRef } from "react"
import { useAppSelector } from "store/hooks"
import { selectRecordingVideo, selectWatchedVideo } from "store/videoRecordSlice"
import styled from "styled-components"


const VideoPlayer = styled.video`
    width: 100%;
    height: 100%;
    display: ${props => props.autoPlay ? "block" : "none"}
`;

export const WatchVideo = () => {
    const recording = useAppSelector(selectRecordingVideo)
    const watchedVideo = useAppSelector(selectWatchedVideo)

    const videoRef = useRef<HTMLVideoElement>(null)

    const fetchVideo = useCallback(async () => {
        if (recording) {
            const url = watchedVideo && watchedVideo.positive_video
            if (url) {
                const response = await fetch(url)
                const blob = await response.blob()
                const objectUrl = URL.createObjectURL(blob)
                if (videoRef.current) {
                    videoRef.current.src = `${objectUrl}`
                    videoRef.current.play()
                }
            }
        }
    }, [recording, watchedVideo])

    useEffect(() => {
        fetchVideo()
    }, [recording, fetchVideo])

    return (
        <VideoPlayer
            ref={videoRef}     
            controls={true}
        />        
    )
}