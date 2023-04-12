import React, { FC } from "react"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"
import { TestVideoTitle } from "components/RecordVideo/TestVideo/TestVideoTitle"
import { TestVideoBlock } from "components/RecordVideo/TestVideo/TestVideoBlock"
import styled from "styled-components"


const PageWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 80px;
    margin: 0 auto;
`;

const TestVideoPage: FC = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'MoreTimeTestVideoPage'} />
            <MainContainer>
                <PageWrapper>                    
                    <TestVideoTitle/>
                    <TestVideoBlock/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default TestVideoPage