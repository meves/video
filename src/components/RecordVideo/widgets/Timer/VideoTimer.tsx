import React, { useEffect, useState } from "react"
import styles from "./Timer.module.scss"


export const VideoTimer = ({
    startValue,
    videoStarted,
    smallTimer = false,
    stopRecordVideo
} : {
    startValue: number
    videoStarted: boolean
    smallTimer?: boolean
    stopRecordVideo: () => void
}) => {
    const [timer, setTimer] = useState<number>(startValue)

    const [showTimer, setShowTimer] = useState(true)

    useEffect(() => {
        let timerId: any
        if (videoStarted) {
            timerId = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 0) {
                        clearInterval(timerId)     
                        return 0
                    }
                    return prevTimer - 1
                })
            }, 1000)
            return () => {
                clearInterval(timerId)
            }
        }
    }, [videoStarted])

    useEffect(() => {
        if (timer <= 0) {
            stopRecordVideo()
            setShowTimer(false)
        }
    }, [timer, stopRecordVideo])

    if (!showTimer) {
        return null
    }
    
    return (
        <div className={smallTimer ? styles.timer_small : styles.timer}>
            { timer }
        </div>
    )
}