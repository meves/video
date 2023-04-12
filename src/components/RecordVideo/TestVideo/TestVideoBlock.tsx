import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { linkButtons } from "../widgets/Buttons";
import { TestTimer } from "../widgets/Timer/TestTimer";
import { TestVideo } from "../widgets/Video/TestVideo";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    selectEndedVideo,
    selectPausngVideo,
    selectPlayingVideo,
    selectPreparingVideo,
    selectRecordingVideo,
    selectStoppingVideo,
    selectStream,
    setEndedVideo,
    setPausingVideo,
    setPlayingVideo,
    setPreparingVideo,
    setRecordingVideo,
    setStoppingVideo,
    setStream
} from "store/videoRecordSlice";
import { buttons } from "../widgets/Buttons";
import { NavLink, useNavigate } from "react-router-dom";
import { initialTestVideoTimerValue } from "../constants";


const VideoWrapper = styled.main`
    width: 754px;
    height: 600px;
    position: relative;
    background-color: var(--video-bg);
    border-radius: 20px;
`;

const TimerWrapper = styled.div`
    position: absolute;
    right: 84px;
    bottom: 40px;
    display: flex;
    align-items: flex-end;
    position: absolute;
`;

const ControlsPanel = styled.div`
    position: absolute;
    left: 0;
    bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 12px;
`;

const MoreTimeButton = styled(NavLink)`
    ${buttons};
`;

const ReadyButton = styled.button`
    ${buttons};
`;

const WatchButton = styled.button`
    ${buttons};
`;

const StartButton = styled.button`
    ${buttons};    
`;

const StopButton = styled.button`
    ${buttons};    
`;

const PauseButton = styled.button`
    ${buttons};    
`;

const MoveToDescriptionButton = styled.button`
    ${linkButtons};
`;

const RecordButton = styled.button`
    ${buttons};
    animation-name: recording;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    
    @keyframes recording {
        from {
            color: var(--white);
        }
        50% {
            color: var(--red);
        }
        to {
            color: var(--white);
        }
    }
`;

export const TestVideoBlock = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const nextPath = useRef("")

    const timerValue = useMemo(() => initialTestVideoTimerValue, [])
    
    const recording = useAppSelector(selectRecordingVideo)
    const stopping = useAppSelector(selectStoppingVideo)
    const playing = useAppSelector(selectPlayingVideo)
    const pausing = useAppSelector(selectPausngVideo)
    const ended = useAppSelector(selectEndedVideo)
    const preparing = useAppSelector(selectPreparingVideo)
    const stream = useAppSelector(selectStream)

    const stopRecordTestVideo = useCallback(() => {
        dispatch(setRecordingVideo(false))
        dispatch(setStoppingVideo(true))
    }, [dispatch])

    const handleStartTestVideoOnClick = useCallback(() => {
        dispatch(setPreparingVideo(false))
        dispatch(setRecordingVideo(true))
    }, [dispatch])

    const handleStopRecordTestVideoOnClick = useCallback(() => {
        stopRecordTestVideo()
    }, [stopRecordTestVideo])

    const handlePlayTestVideoonClick = useCallback(() => {
        dispatch(setStoppingVideo(false))
        dispatch(setPausingVideo(false))
        dispatch(setPlayingVideo(true))
    }, [dispatch])

    const handlePauseTestVideoOnClick = useCallback(() => {
        dispatch(setPlayingVideo(false))
        dispatch(setPausingVideo(true))
    }, [dispatch])

    const handleReadyOnClick = useCallback(() => {
        nextPath.current = "/info"
        navigate("/info")
    }, [navigate])
    
    const handleMoveToDescriptionOnClick = useCallback(() => {
        dispatch(setStream(null))
        navigate("/")
    }, [navigate, dispatch])

    const clearVideoRecordState = useCallback(() => {
        dispatch(setPreparingVideo(false))
        dispatch(setRecordingVideo(false))
        dispatch(setStoppingVideo(false))
        dispatch(setPlayingVideo(false))
        dispatch(setPausingVideo(false))
        dispatch(setEndedVideo(false))
        if (nextPath.current !== "/info") {
            stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
            dispatch(setStream(null))
        }
    }, [dispatch, stream])
    
    useEffect(() => {
        dispatch(setPreparingVideo(true))
        return () => {
            clearVideoRecordState()
        }
    }, [clearVideoRecordState, dispatch])
    
    return (
        <VideoWrapper>
            <TestVideo />
            <TimerWrapper>
                {recording ?
                    <TestTimer
                        stopRecordTestVideo={stopRecordTestVideo}
                        startValue={timerValue}
                    /> : null
                }
            </TimerWrapper>
            <ControlsPanel>

                {recording ?
                    <>
                        <StopButton onClick={handleStopRecordTestVideoOnClick}>Стоп</StopButton>
                        <RecordButton>Идет запись</RecordButton>
                    </>
                    : null}

                <ButtonsWrapper>
                    {playing ? <PauseButton onClick={handlePauseTestVideoOnClick}>Пауза</PauseButton> : null}
                    {stopping || pausing ? <WatchButton onClick={handlePlayTestVideoonClick}>Смотреть</WatchButton> : null}

                    {stopping || playing || pausing || ended || preparing ?
                        <>
                            {preparing ? <StartButton onClick={handleStartTestVideoOnClick}>Старт</StartButton> : null}
                            <MoreTimeButton to="/start">Еще раз</MoreTimeButton>
                            <ReadyButton onClick={handleReadyOnClick}>Готово</ReadyButton>
                            <MoveToDescriptionButton
                                onClick={handleMoveToDescriptionOnClick}
                            >Перейти к описанию</MoveToDescriptionButton>
                        </> : null
                    }
                </ButtonsWrapper>

            </ControlsPanel>
        </VideoWrapper>
    )
}