import React from "react"
import { AppLayout } from "components/app/Layouts"
import { PasswordsContainer } from "components/Forms/widgets/PasswordsContainer/PasswordsContainer"
import { PasswordsImage } from "components/Forms/widgets/FormImages/PasswordsImage"
import { ChangePasswordForm } from "components/Forms"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"


const PageWrapper = styled.section`
    display: flex;
` ;

const ChangePasswordPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'ChangePasswordPage'} />
            <MainContainer>
                <PageWrapper>
                    <PasswordsContainer>
                        <PasswordsImage/>
                        <ChangePasswordForm/>
                    </PasswordsContainer>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
    )
}

export default ChangePasswordPage