import React, { FC } from "react"
import CameraIcon from "assets/images/video/camera.png"
import MicrophoneIcon from "assets/images/video/microphone.png"
import styled from "styled-components";


const ErrorMessageWrapper = styled.div`
    margin-bottom: 8px;
`;

const ErrorMessage = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    color: var(--white);
`;

const ImageIcon = styled.img`
    width: 24px;
    height: 24px;
`;

type Props = {
    cameraPluggedIn: boolean
    microphonePluggedIn: boolean
    errorMessage: string
}

export const MediaErrorMessage: FC<Props> = ({ cameraPluggedIn, microphonePluggedIn, errorMessage }) => {
    return (
        <div>
            <ErrorMessageWrapper>
                { cameraPluggedIn ? "" : 
                    <ErrorMessage>
                        <ImageIcon width="24" height="24" src={CameraIcon} alt="Camera is not plugged in" />
                        <div>Камера не подключена. Проверьте подключение.</div>
                    </ErrorMessage> }
            </ErrorMessageWrapper>
            <ErrorMessageWrapper>
                { microphonePluggedIn ? "" : 
                    <ErrorMessage>
                        <ImageIcon src={MicrophoneIcon} alt="Microphone is not plugged in" />
                        <div>Микрофон не подключен. Проверьте подключение.</div>
                    </ErrorMessage> }
            </ErrorMessageWrapper>
            <ErrorMessageWrapper>
                { errorMessage ? <ErrorMessage>{ errorMessage }</ErrorMessage> : null }
            </ErrorMessageWrapper>
        </div>
    )
}