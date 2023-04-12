import React from "react"
import { AppLayout } from "components/app/Layouts"
import { PasswordsContainer } from "components/Forms/widgets/PasswordsContainer/PasswordsContainer"
import { PasswordsImage } from "components/Forms/widgets/FormImages/PasswordsImage"
import { NewPasswordForm } from "components/Forms"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"
import { AfterPasswordRecoveryModal } from "components/common/Modal/Parent"
import { useAppSelector } from "store/hooks"
import { selectAfterPasswordRecoveryModalOpen } from "store/modalSlice"

const PageWrapper = styled.section`
    display: flex;
` ;

const NewPasswordPage = () => {
    const setAfterPasswordRecoveryModalOpen = useAppSelector(selectAfterPasswordRecoveryModalOpen)

    return (
        <>
        { setAfterPasswordRecoveryModalOpen ? <AfterPasswordRecoveryModal/> : null }
        <AppLayout>
            <TemporaryMark text={'NewPasswordPage'} />
            <MainContainer>
                <PageWrapper>
                    <PasswordsContainer>
                        <PasswordsImage/>
                        <NewPasswordForm/>
                    </PasswordsContainer>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
        </>
    )
}

export default NewPasswordPage