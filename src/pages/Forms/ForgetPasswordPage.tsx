import React from "react"
import { AppLayout } from "components/app/Layouts"
import { PasswordsContainer } from "components/Forms/widgets/PasswordsContainer/PasswordsContainer"
import { PasswordsImage } from "components/Forms/widgets/FormImages/PasswordsImage"
import { ForgetPasswordForm } from "components/Forms"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"
import { PasswordResetModal } from "components/common/Modal/Parent"
import { useAppSelector } from "store/hooks"
import { selectPasswordResetModalOpen } from "store/modalSlice"


const PageWrapper = styled.section`
    display: flex;
` ;

const ForgetPasswordPage = () => {
    const passwordResetModalOpen = useAppSelector(selectPasswordResetModalOpen)

    return (
        <>
        { passwordResetModalOpen ? <PasswordResetModal/> : null }
        <AppLayout>
            <TemporaryMark text={'ForgetPasswordPage'} />
            <MainContainer>
                <PageWrapper>
                    <PasswordsContainer>
                        <PasswordsImage/>
                        <ForgetPasswordForm/>
                    </PasswordsContainer>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
        </>
    )
}

export default ForgetPasswordPage