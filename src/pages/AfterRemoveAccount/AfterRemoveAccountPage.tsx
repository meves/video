import { AfterRemoveAccountPageContainer } from "components/AfterRemoveAccount/AfterRemoveAccount"
import { MainContainer } from "components/app/Containers/MainContainer"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import React from "react"
import styled from "styled-components"


const PageWrapper = styled.section`
    padding-top: 64px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 790px;
`;

const AfterRemoveAccountPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text="AfterRemoveAccountPage"/>
            <MainContainer>
                <PageWrapper>
                    <AfterRemoveAccountPageContainer/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default AfterRemoveAccountPage