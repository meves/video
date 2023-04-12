import React, { ReactNode } from "react"
import { AppHeader } from "./../AppHeader/AppHeader"
import { AppFooter } from "./../AppFooter/AppFooter"
import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const AppLayout = ({ children } : { children: ReactNode }) => {
    return (
        <Wrapper>
            <AppHeader/>
            { children }
            <AppFooter/>
        </Wrapper>
    )
}