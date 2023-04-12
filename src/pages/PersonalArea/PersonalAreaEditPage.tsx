import React, { useState } from "react"
import { AppLayout } from "components/app/Layouts"
import { PersonalAreaContainer } from "components/PersonalArea/PersonalAreaContainer"
import { PersonalAreaImagesBlock } from "components/PersonalArea/PersonalAreaImagesBlock"
import { PersonalAreaEditForm } from "components/Forms"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"
import styled from "styled-components"
import { SubmitEmailModal, SubmitRemoveModal } from "components/common/Modal/Parent"


const PageWrapper = styled.section`
    display: flex;
`;

const PersonalAreaPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    return (
        <>
        { isOpen && <SubmitRemoveModal isOpen={isOpen} setIsOpen={setIsOpen} setIsFormOpen={setIsFormOpen} />}
        { isFormOpen && <SubmitEmailModal isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}
        <AppLayout>
            <TemporaryMark text={'PersonalAreaPage'} />
            <MainContainer>
                <PageWrapper>
                    <PersonalAreaContainer>
                        <PersonalAreaImagesBlock/>
                        <PersonalAreaEditForm
                            setIsOpen={setIsOpen}
                        />
                    </PersonalAreaContainer>
                </PageWrapper>
            </MainContainer>
        </AppLayout>
        </>
    )
}

export default PersonalAreaPage