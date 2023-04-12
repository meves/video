import React from "react"
import { AppLayout } from "components/app/Layouts"
import { ThankMessage } from "components/Forms/widgets/ThankMessage/ThankMessage"
import { ThankImage } from "components/Forms/widgets/FormImages/ThankImage"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"


const PageWrapper = styled.section`
    /* height: calc(100vh - 116px); */
    /* height: calc(100vh - 316px); */
    padding-top: 133px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const ThankForRegistrationPage = () => {
    return (
        
        <AppLayout>
            <MainContainer>
                <TemporaryMark text={'ThankForRegistrationPage'} />
                <PageWrapper>
                    <ThankMessage/>
                    <ThankImage/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
        
    )
}

export default ThankForRegistrationPage