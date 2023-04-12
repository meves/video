import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components";
import { buttons, linkButtons } from "../widgets/Buttons";
import { TestVideo } from "../widgets/Video/TestVideo";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectStream, setStream } from "store/videoRecordSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Constraints } from "../types";


const VideoWrapper = styled.main`
    width: 754px;
    height: 600px;
    position: relative;
    background-color: var(--video-bg);
    border-radius: 20px;
`;

const ControlsWrapper = styled.div`
    position: absolute;
    left: 100px;
    bottom: 40px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 12px;
`;

const MoveToDescriptionButton = styled.button`
    ${linkButtons};
`;

const StartButton = styled.button`
    ${buttons};
    color: ${props => props.disabled && "var(--black)"};
    background-color: ${props => props.disabled && "var(--grey)"};
    border: ${props => props.disabled && "none"};

    &:hover {
        background-color: ${props => props.disabled && "var(--grey)"};
        cursor: ${props => props.disabled && "not-allowed"};
    }
`;

type Props = {
    setCameraPluggedIn: (cameraPluggedIn: boolean) => void
    setMicrophonePluggedIn: (microphonePluggedIn: boolean) => void
    setErrorMessage: (errorMessage: string) => void
}

export const StartTestVideoBlock: FC<Props> = ({
    setCameraPluggedIn,
    setMicrophonePluggedIn,
    setErrorMessage
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const videoStream = useAppSelector(selectStream)
    const nextPath = useRef("")

    const mediaDevices: MediaDevices = useMemo(() => navigator.mediaDevices, [])
    const constraints: Constraints = useMemo(() => ({
        audio: true,
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 10, max: 15 }
        }
    }), [])

    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState<boolean>(true)

    const prepareTestRecord = useCallback(async () => {
        // подготовка к тестовой записи
        try {
            const stream = await mediaDevices.getUserMedia(constraints)
            const videoTracks = stream.getVideoTracks()
            if (videoTracks.length === 0) {
                setCameraPluggedIn(false)
            } else {
                setCameraPluggedIn(true)
            }
            const audioTracks = stream.getAudioTracks()
            if (audioTracks.length === 0) {
                setMicrophonePluggedIn(false)
            } else {
                setMicrophonePluggedIn(true)
            }
            if (videoTracks.length === 0 || audioTracks.length === 0) {
                setIsStartButtonDisabled(true)
            }
            if (videoTracks.length !== 0 && audioTracks.length !== 0) {
                setIsStartButtonDisabled(false)
                dispatch(setStream(stream))
            }
        } catch (error: any) {
            if (error.name === 'ConstraintNotSatisfiedError') {
                setErrorMessage('Разрешение ' + constraints.video.width + 'x' +
                    constraints.video.height + ' px не поддерживается устройством.');
            } else if (error.name === 'PermissionDeniedError') {
                setErrorMessage('Разрешения на использование камеры и микрофона не были предоставлены. ' +
                    'Вам нужно разрешить странице доступ к вашим устройствам,' +
                    ' чтобы демо-версия работала.');
            }
        }
    }, [mediaDevices, constraints, setMicrophonePluggedIn, setCameraPluggedIn, setErrorMessage, dispatch])

    useEffect(() => {
        mediaDevices.addEventListener("devicechange", prepareTestRecord)
        prepareTestRecord()
        return () => {
            mediaDevices.removeEventListener("devicechange", prepareTestRecord)
        }
    }, [mediaDevices, prepareTestRecord])

    const handleStartTestVideoOnClick = useCallback(() => {
        nextPath.current = "/test"
        navigate("/test")
    }, [navigate])

    const handleMoveTodescriptionOnClick = useCallback(() => {
        
        videoStream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        console.log(`сработало`);
        navigate("/")
    }, [videoStream, navigate, dispatch])

    useEffect(() => {
        const resetVideo = () => {
            if (nextPath.current !== "/test") {
                videoStream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
            }
        }
        return () => {
            resetVideo()
        } 
    }, [videoStream, location.pathname, dispatch])

    useEffect(() => {
        return () => {
            if (nextPath.current !== "/test") {
                dispatch(setStream(null))
            }
        }
    }, [dispatch])

    return (
        <VideoWrapper>
            <TestVideo />
            <ControlsWrapper>
                <ButtonsWrapper>
                    <StartButton
                        disabled={isStartButtonDisabled}
                        onClick={handleStartTestVideoOnClick}
                    >Начать тестовую запись
                    </StartButton>
                    <MoveToDescriptionButton
                        onClick={handleMoveTodescriptionOnClick}
                    >Перейти к описанию
                    </MoveToDescriptionButton>
                </ButtonsWrapper>
            </ControlsWrapper>
        </VideoWrapper>
    )
}