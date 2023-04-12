import React from "react"
import { AppLayout } from "components/app/Layouts"
import { AuthImage } from "components/Forms/widgets/FormImages/AuthImage"
import { LoginForm } from "components/Forms"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"


const PageWrapper = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    padding-top: 56px;
    padding-bottom: 0;
` ;

const LoginPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'LoginPage'} />
            <MainContainer>
                <PageWrapper>
                    <AuthImage/>
                    <LoginForm/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default LoginPage