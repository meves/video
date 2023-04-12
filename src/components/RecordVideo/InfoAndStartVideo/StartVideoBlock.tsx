import React, { useCallback, useEffect, useRef } from "react"
import { buttons, linkButtons } from "../widgets/Buttons"
import { RecordVideo } from "../widgets/Video/RecordVideo"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectSeriesNumber, selectStream, setDescribedSideThunk, setStream } from "store/videoRecordSlice";
import { setAfterThirdVideoModalOpen } from "store/modalSlice";


const VideoWrapper = styled.section`
    margin-left: 243px;
`;
const VideoBlock = styled.div`
    width: 754px;
    height: 600px;
    position: relative;
    background-color: var(--video-bg);
    border-radius: 20px;
`;

const ButtonsWrapper = styled.div`
    position: absolute;
    left: 190px;
    bottom: 40px;
    display: flex;
    gap: 12px;
`;

const StartButton = styled.button`
    ${buttons};
`;

const MoveToDescriptionButton = styled.button`
    ${linkButtons};
`;

export const StartVideoBlock = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const seriesNumber = useAppSelector(selectSeriesNumber)
    const stream = useAppSelector(selectStream)
    const nextPath = useRef("")

    const handleStartRecordVideoOnClick = useCallback(() => {
        if (seriesNumber < 3) {
            nextPath.current = "/record"
            dispatch(setDescribedSideThunk())
            navigate("/record")
        } else {
            dispatch(setAfterThirdVideoModalOpen(true))
        }
    }, [dispatch, navigate, seriesNumber])  

    const handleMoveToDescriptionOnClick = useCallback(() => {
        stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        navigate("/")
    }, [dispatch, navigate, stream])

    useEffect(() => {
        const resetVideo = () => {
            if (nextPath.current !== "/record") {
                stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
            }
        }
        return () => {
            resetVideo()
        } 
    }, [dispatch, stream])
        
    useEffect(() => {
        return () => {
            if (nextPath.current !== "/record") {
                dispatch(setStream(null))
            }
        }
    }, [dispatch])

    return (
        <VideoWrapper>
            <VideoBlock>
                <RecordVideo />
                <ButtonsWrapper>
                    <StartButton 
                        onClick={handleStartRecordVideoOnClick}
                    >Старт
                    </StartButton>
                    <MoveToDescriptionButton
                        onClick={handleMoveToDescriptionOnClick}    
                    >Перейти к описанию</MoveToDescriptionButton>
                </ButtonsWrapper>
            </VideoBlock>
        </VideoWrapper>
    )
}