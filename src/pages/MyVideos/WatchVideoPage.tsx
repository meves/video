import React from "react"
import { MainContainer } from "components/app/Containers/MainContainer"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { VideoWatchContainer } from "components/MyVideos/VideoWatchContainer"
import styled from "styled-components"


const PageWrapper = styled.section`
    max-width: 854px;
    margin: 0 auto;
`;

const WatchVideoPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text="WatchVideoPage"/>
            <MainContainer>
                <PageWrapper>
                    <VideoWatchContainer/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default WatchVideoPage