import React from "react"
import styled from "styled-components"


const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const SmallColumnBlock = () => {
    return (
        <ColumnWrapper>
            <Elliplse/>
            <SmallColumn/>
        </ColumnWrapper>
    )
}

export const LargeColumnBlock = () => {
    return (
        <ColumnWrapper>
            <Elliplse/>
            <LargeColumn/>
        </ColumnWrapper>
    )    
}

const Elliplse = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_1165_107)"/>
            <defs>
            <linearGradient id="paint0_linear_1165_107" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#21D6CC"/>
            <stop offset="1" stopColor="#7D21CF"/>
            </linearGradient>
            </defs>
        </svg>
    )
}

export const SmallColumn = () => {
    return (
        <svg width="13" height="52" viewBox="0 0 13 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.7" d="M0 0C0 0 3.84415 1.55224 6.5 1.55224C9.15585 1.55224 13 0 13 0V52C13 52 9.15585 50.4478 6.5 50.4478C3.84415 50.4478 0 52 0 52V0Z" fill="url(#paint0_linear_1165_114)"/>
            <defs>
            <linearGradient id="paint0_linear_1165_114" x1="6.5" y1="0" x2="6.5" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#21D6CC"/>
            <stop offset="1" stopColor="#7D21CF"/>
            </linearGradient>
            </defs>
        </svg>        
    )
}

export const LargeColumn = () => {
    return (
        <svg width="13" height="74" viewBox="0 0 13 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0C0 0 3.84415 2.20896 6.5 2.20896C9.15585 2.20896 13 0 13 0V74C13 74 9.15585 71.791 6.5 71.791C3.84415 71.791 0 74 0 74V0Z" fill="url(#paint0_linear_1165_111)"/>
            <defs>
            <linearGradient id="paint0_linear_1165_111" x1="6.5" y1="0" x2="6.5" y2="74" gradientUnits="userSpaceOnUse">
            <stop stopColor="#21D6CC"/>
            <stop offset="1" stopColor="#7D21CF"/>
            </linearGradient>
            </defs>
        </svg>        
    )
}
