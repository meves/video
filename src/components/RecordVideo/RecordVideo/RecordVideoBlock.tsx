import React, { useCallback, useEffect } from "react"
import { RecordVideo } from "../widgets/Video/RecordVideo"
import { buttons } from "../widgets/Buttons"
import styled from "styled-components"
import { RecordTitle } from "../widgets/RecordTitle"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { 
    resetVideoNumber, 
    selectDescribedSide, 
    selectEndedVideo, 
    selectPausngVideo, 
    selectPreparingVideo, 
    selectRecordingVideo,
    selectStoppingVideo, 
    selectStream, 
    setPausingVideo, 
    setPreparingVideo, 
    setRecordingVideo, 
    setStoppingVideo,
    setDescribedSideThunk,
    setEndedVideo
} from "store/videoRecordSlice"
import { Described } from "store/types"
import { initialCountDownTimerValue, initialRecordVideoTimerValue, initialTotalVideoTimerValue } from "../constants"
import { CountDownTimer } from "../widgets/Timer/CountDownTimer"
import { setRecordModalOpen } from "store/modalSlice"
import { VideoTimer } from "../widgets/Timer/VideoTimer"


const VideoWrapper = styled.div`
    width: 708px;
    height: 600px;
    position: relative;
    background-color: var(--video-bg);
    border-radius: 20px;
`;

const ButtonsWrapper = styled.div`
    position: absolute;
    left: 220px;
    bottom: 40px;
    display: flex;
    gap: 12px;
`;

const StartButton = styled.button`
    ${buttons};
`;

const StopButton = styled.button`
    ${buttons};
`;

const CancelButton = styled.button`
    ${buttons};
`;

const TimerText = styled.div`
    margin-top: 25px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    color: var(--white);
    text-align: center;
`;

export const RecordVideoBlock = () => {
    const dispatch = useAppDispatch()
    
    const stream = useAppSelector(selectStream)
    const preparing = useAppSelector(selectPreparingVideo)
    const recording = useAppSelector(selectRecordingVideo)
    const stopping = useAppSelector(selectStoppingVideo)
    const pausing = useAppSelector(selectPausngVideo)
    const ended = useAppSelector(selectEndedVideo)
    
    const describedSide = useAppSelector(selectDescribedSide)
    
    const handleCancelRecordVideoOnClick = useCallback(() => {
        dispatch(setRecordModalOpen(true))
    }, [dispatch])
    
    const startRecordVideo = useCallback(() => {
        dispatch(setPreparingVideo(false))
        dispatch(setRecordingVideo(true))
        dispatch(setStoppingVideo(false))
    }, [dispatch])

    const handleStartRecordVideoOnClick = useCallback(() => {
        startRecordVideo()
    }, [startRecordVideo])
    
    const stopRecordVideo = useCallback(async () => {        
        dispatch(setRecordingVideo(false))
        dispatch(setStoppingVideo(true))
    }, [dispatch])

    const handleStopRecordVideoOnClick = useCallback(() => {
        stopRecordVideo()
    }, [stopRecordVideo])    

    useEffect(() => {
        dispatch(setDescribedSideThunk())
        const resetVideo = () => {
            stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        }
        return () => {
            resetVideo()
        } 
    }, [dispatch, stream])
        
    useEffect(() => {
        dispatch(setPreparingVideo(true))
        dispatch(setDescribedSideThunk())
        return () => {
            dispatch(setPreparingVideo(false))
            dispatch(setRecordingVideo(false))
            dispatch(setStoppingVideo(false))
            dispatch(setPausingVideo(false))
            dispatch(setEndedVideo(false))
            //dispatch(setStream(null))
            dispatch(resetVideoNumber())
        }
    }, [dispatch])
    
    return (
        <section>
            <RecordTitle>
                { describedSide === Described.POSITIVE ? "Расскажите о положительных сторонах" 
                : describedSide === Described.NEGATIVE ? "Расскажите об отрицательных сторонах"
                : "Подведите итоги"
                }
            </RecordTitle>
            <VideoWrapper>
                <RecordVideo/>
                <ButtonsWrapper>
                    { (preparing || (stopping)) && 
                        <StartButton onClick={handleStartRecordVideoOnClick}>Готово</StartButton>
                    }
                    { recording && 
                        <StopButton onClick={handleStopRecordVideoOnClick}>Стоп</StopButton>
                    }
                    <CancelButton onClick={handleCancelRecordVideoOnClick}>Отмена</CancelButton>
                </ButtonsWrapper>
            </VideoWrapper>
            { (preparing || (stopping && ! pausing)) &&
                <TimerText>
                    Через&nbsp;
                    <CountDownTimer 
                        startRecordVideo={startRecordVideo}
                        startValue={initialCountDownTimerValue} 
                        smallTimer={true}/>&nbsp;
                    секунд начнется запись
                </TimerText>
            }
            
            { (recording || ended) &&
                <TimerText>
                    Через&nbsp;
                    <VideoTimer 
                        stopRecordVideo={stopRecordVideo}
                        startValue={recording ? initialRecordVideoTimerValue : ended ? initialTotalVideoTimerValue : 0} 
                        videoStarted={true} 
                        smallTimer={true} />&nbsp;
                    секунд запись остановится
                </TimerText>
            }
        </section> 
    )
}