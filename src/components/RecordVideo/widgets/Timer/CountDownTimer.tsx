import React, { useEffect, useState } from "react"
import styles from "./Timer.module.scss"


export const CountDownTimer = ({
    startValue,
    smallTimer = false,
    startRecordVideo
} : {
    startValue: number
    smallTimer?: boolean
    startRecordVideo: () => void
}) => {
    const [timer, setTimer] = useState<number>(startValue)

    const [showTimer, setShowTimer] = useState(true)

    useEffect(() => {
        let timerId: any
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
    }, [])

    useEffect(() => {
        if (timer <= 0) {
            startRecordVideo()
            setShowTimer(false)
        }
    }, [timer, startRecordVideo])

    if (!showTimer) {
        return null
    }

    return (
        <div className={smallTimer ? styles.timer_small : styles.timer}>
            { timer }
        </div>
    )
}