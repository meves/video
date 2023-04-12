import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"


const LinkWrapper = styled(NavLink)`
    display: inline-block;
    padding: 15px 30px;
    margin-top: 20px;
    border-radius: 20px;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;
    background-color: var(--blue-border);
    color: var(--white);
    text-decoration: none;
`;

export const StandartErrorContent = () => {
    return (
        <div>
            <p>
                Что-то пошло не так.<br/>
                Повторите попытку или зайдите позже.
            </p>
            <LinkWrapper to="/">Перезагрузить</LinkWrapper>
        </div>
    )
}