import React, { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

export const linkButtons = css`
    padding: 16px 32px;
    border: 1px solid var(--blue-accent);
    border-radius: 20px;

    background-color: var(--transparent);
    color: var(--white);
    font-family: var(--open-sans);
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: var(--blue-accent);
    }    
`;

const LinkButtonWrapper = styled(NavLink)`
    ${linkButtons};
`;

export const LinkButton = ({
    to,
    children,
    buttonClass = ''
} : {
    to: string
    children: ReactNode
    buttonClass?: string
}) => {
    return (
        <LinkButtonWrapper to={to}>
            { children }
        </LinkButtonWrapper>
    )
}

const ButtonWrapper = styled.button`
    padding: 16px 32px;
    border: 1px solid var(--blue-accent);
    border-radius: 20px;

    background-color: var(--blue-accent);
    color: var(--white);
    font-family: var(--open-sans);
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: var(--blue-start-hover);
    }
`;

export const StartStopButton = ({
    onclickHandler,
    children
} : {
    onclickHandler: () => void,
    children: ReactNode
}) => {
    return (
        <ButtonWrapper
            onClick={onclickHandler}
        >{ children }
        </ButtonWrapper>
    )
}

export const buttons = css`
    padding: 16px 32px;
    border: 1px solid var(--blue-accent);
    border-radius: 20px;
    background-color: var(--blue-accent);
    color: var(--white);
    font-family: var(--open-sans);
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    text-decoration: none;
    
    &:hover {
        background-color: var(--blue-start-hover);
        cursor: pointer;
    }
`;