import React from "react"
import { Banner, Problem, Speech, Study, Summary } from "components/Home"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"


export const HomePage = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'HomePage'} />
            <main>
                <MainContainer>
                    <Banner/>
                    <Problem/>
                    <Summary/>
                    <Study/>
                </MainContainer>
                <Speech/>
            </main>
        </AppLayout>
    )
}