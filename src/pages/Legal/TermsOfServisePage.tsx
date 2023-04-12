import { MainContainer } from "components/app/Containers/MainContainer"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { TermsOfServise } from "components/Legal/TermsOfServise"
import React from "react"


const TermsOfServisePage = () => {
    return (
        <AppLayout>
            <TemporaryMark text="TermsOfServisePage"/>
            <MainContainer>
                <TermsOfServise/>
            </MainContainer>
        </AppLayout>
    )
}

export default TermsOfServisePage