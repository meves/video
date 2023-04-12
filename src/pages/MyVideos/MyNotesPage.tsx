import React from "react"
import { AppLayout } from "components/app/Layouts"
import { TemporaryMark } from "components/app/TemporaryMark"
import { MainContainer } from "components/app/Containers/MainContainer"
import { MyNotesContainer } from "components/MyVideos/MyNotesContainer"


const MyNotesPage = () => {
    return (
        <AppLayout>
            <TemporaryMark text={'MyNotesPage'} />
            <MainContainer>
                <MyNotesContainer/>
            </MainContainer>
        </AppLayout>
    )
}

export default MyNotesPage