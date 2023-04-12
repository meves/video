import { MainContainer } from "components/app/Containers/MainContainer"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { PrivacyStatement } from "components/Legal/PrivacyStatement"
import React from "react"


const PrivacyStatementPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text="PrivacyStatementPage"/>
            <MainContainer>
                <PrivacyStatement/>
            </MainContainer>
        </AppLayout>
    )
}

export default PrivacyStatementPage