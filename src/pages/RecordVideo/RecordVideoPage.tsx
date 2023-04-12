import React from "react"
import { AppLayout } from "components/app/Layouts"
import { RecordImageBlock } from "components/RecordVideo/RecordVideo/RecordImageBlock"
import { RecordVideoBlock } from "components/RecordVideo/RecordVideo/RecordVideoBlock"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"
import styled from "styled-components"
import { AfterFirstVideoModal, AfterSecondVideoModal, AfterThirdVideoModal, RecordModal, VideoNotSentModal } from "components/common/Modal/Parent"


const PageWrapper = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    padding-top: 64px;
    margin: 0 auto;
`;

const RecordVideoPage = () => {
    
    return (
        <AppLayout>
            <TemporaryMark text={'RecordVideoPage'} />
            <MainContainer>
                <PageWrapper>
                    <RecordImageBlock/>
                    <RecordVideoBlock/>
                </PageWrapper>
            </MainContainer>
            <RecordModal/> 
            <AfterFirstVideoModal/> 
            <AfterSecondVideoModal/> 
            <AfterThirdVideoModal/>
            <VideoNotSentModal/>
        </AppLayout>
    )
}

export default RecordVideoPage