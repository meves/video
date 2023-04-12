import React from "react"
import { AppLayout } from "components/app/Layouts"
import { InfoBlock } from "../../components/RecordVideo/InfoAndStartVideo/InfoBlock"
import { StartVideoBlock } from "components/RecordVideo/InfoAndStartVideo/StartVideoBlock"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"
import styled from "styled-components"
import { AfterThirdVideoModal } from "components/common/Modal/Parent"


const PageWrapper = styled.section`
    padding-top: 65px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const InfoAndStartVideoPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'InfoAndStartPage'} />
            <MainContainer>
                <PageWrapper>
                    <InfoBlock/>
                    <StartVideoBlock/>
                </PageWrapper>
            </MainContainer>
            <AfterThirdVideoModal/>
        </AppLayout>
    )
}

export default InfoAndStartVideoPage