import React from "react"
import { AppLayout } from "components/app/Layouts"
import { AuthImage } from "components/Forms/widgets/FormImages/AuthImage"
import { RegistrationForm } from "components/Forms/"
import { TemporaryMark } from "components/app/TemporaryMark"
import styled from "styled-components"
import { MainContainer } from "components/app/Containers/MainContainer"
import { EmailAlreadyRegisteredModal } from "components/common/Modal/Parent"
import { useAppSelector } from "store/hooks"
import { selectEmailAlreadyRegisteredModalOpen } from "store/modalSlice"


const PageWrapper = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 30px;
    padding-top: 56px;
    padding-bottom: 0;
` ;

const RegistrationPage = () => {
    const emailAlreadyRegisteredModalOpen = useAppSelector(selectEmailAlreadyRegisteredModalOpen)

    return (
        <>
        { emailAlreadyRegisteredModalOpen ? <EmailAlreadyRegisteredModal/> : null}
        <AppLayout>
            <TemporaryMark text={'RegistrationPage'} />
            <MainContainer>
                <PageWrapper>
                    <AuthImage/>
                    <RegistrationForm/>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
        </>
    )
}

export default RegistrationPage