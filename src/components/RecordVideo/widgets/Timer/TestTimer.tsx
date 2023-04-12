import React, { FC, useEffect, useState } from "react"
import styles from "./Timer.module.scss"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectRecordingVideo, setRecordingVideo, setStoppingVideo } from "store/videoRecordSlice"


type TestTimerProps = {
    startValue: number
    smallTimer?: boolean
    stopRecordTestVideo: () => void
}

export const TestTimer: FC<TestTimerProps> = ({ startValue, smallTimer=false, stopRecordTestVideo }) => {
    const [timer, setTimer] = useState<number>(startValue)
    
    const recording = useAppSelector(selectRecordingVideo)
    const [showTimer, setShowTimer] = useState(recording)

    const dispatch = useAppDispatch()

    useEffect(() => {
        let timerId: any
        if (recording && !timerId) {
            timerId = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 0) {
                        clearInterval(timerId)                                             
                    }
                    return prevTimer - 1
                })
            }, 1000)
            return () => {
                clearInterval(timerId)
            }
        }
    }, [recording, stopRecordTestVideo])

    useEffect(() => {
        if (timer <= 0) {
            dispatch(setRecordingVideo(false))
            dispatch(setStoppingVideo(true))
            setShowTimer(false)
        } 
    }, [dispatch, timer]) 

    if (!showTimer) {
        return null
    }
    
    return (
        <div className={smallTimer ? styles.timer_small : styles.timer}>
            { timer }
        </div>
    )
}