import React from "react"
import styled from "styled-components"



const Wrapper = styled.div`
    width: 28px;
    height: 28px;
    position: relative;
`;

const VerticalLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HorizontalLine = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 14px;
    left: 0;
`;

export const Plus = () => {
    return (
        <Wrapper>
            <VerticalLine>
                <VerticalIcon/>
            </VerticalLine>
            <HorizontalLine>
                <HorizontalIcon/>
            </HorizontalLine>
        </Wrapper>
    )
}

export const Minus = () => {
    return (
        <Wrapper>
            <HorizontalLine>
                <HorizontalIcon/>
            </HorizontalLine>
        </Wrapper>
    )
}

const VerticalIcon = () => {
    return (
        <svg width="2" height="28" viewBox="0 0 2 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1V29" stroke="#F1F2F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const HorizontalIcon = () => {
    return (
        <svg width="28" height="2" viewBox="0 0 28 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H29" stroke="#F1F2F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}