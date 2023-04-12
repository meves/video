import React, { ReactNode } from "react"
import styled from "styled-components"


const MainWrapper = styled.section`
    max-width: var(--content-width);
    width: 100%;
    margin: 0 auto;
    padding-left: var(--content-padding);
    padding-right: var(--content-padding);
    min-height: 50vh;

    @media (max-width:1024px) {
        padding-left: var(--content-padding-mobile);
        padding-right: var(--content-padding-mobile);
    }
`;

export const MainContainer = ({
    children
} : {
    children: ReactNode
}) => {
    return (
        <MainWrapper>
            { children }
        </MainWrapper>
    )
}