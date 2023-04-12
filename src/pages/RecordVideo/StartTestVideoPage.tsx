import React, { useState } from "react"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"
import styled from "styled-components"
import { StartTestVideoTitle } from "components/RecordVideo/StartTestVideo/StartTestVideoTitle"
import { StartTestVideoBlock } from "components/RecordVideo/StartTestVideo/StartTestVideoBlock"
import { MediaErrorMessage } from "components/RecordVideo/StartTestVideo/MediaErrorMessages"


const PageWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 80px;
    margin: 0 auto;
`;

const StartTestVideoPage = () => {
    const [cameraPluggedIn, setCameraPluggedIn] = useState<boolean>(false)
    const [microphonePluggedIn, setMicrophonePluggedIn] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    return (
        <AppLayout>            
            <TemporaryMark text={'StartTestVideoPage'} />
            <MainContainer>
                <PageWrapper>
                    <StartTestVideoTitle/>
                    <StartTestVideoBlock
                        setCameraPluggedIn={setCameraPluggedIn}
                        setMicrophonePluggedIn={setMicrophonePluggedIn}
                        setErrorMessage={setErrorMessage}
                    />
                    <MediaErrorMessage
                        cameraPluggedIn={cameraPluggedIn}
                        microphonePluggedIn={microphonePluggedIn}
                        errorMessage={errorMessage}
                    />
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default StartTestVideoPage
