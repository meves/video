import React, { ReactNode } from "react"
import styled from "styled-components"


const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const AppContainer = ({
    children
} : {
    children: ReactNode
}) => {
    return (
        <AppWrapper>
            { children }
        </AppWrapper>
    )
}
