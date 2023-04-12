import React, { ReactNode } from "react"
import { AppHeader } from "./../AppHeader/AppHeader"

import styled from "styled-components"
const Layout = styled.div`
    /* height: 100vh; */
`;

export const LayoutWithHeader = ({ children } : { children: ReactNode }) => {
    return (
        <Layout>
            <AppHeader/>
            { children }
        </Layout>
    )
}