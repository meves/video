import React from "react"
import { FAQPageContainer } from "../../components/FAQ/FAQ"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"


const PageWrapper = styled.main`
    /* max-width: 1200px; */
    width: 100%;
    padding-top: 64px;
    display: flex;
    flex-direction: column;
`;

const FAQPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'FAQPage'} />
            <MainContainer>
                <PageWrapper>
                    <FAQPageContainer/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default FAQPage