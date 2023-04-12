import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"


const Start = styled(NavLink)`
    display: block;
    max-width: 345px;
    font-family: var(--open-sans);
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    border: none;
    border-radius: 72px;//20px;
    padding: 22px 64px;//20px 138px;
    color: var(--pure-white);//var(--black);
    background-color: var(--blue-cookie);//var(--blue-accent);
    transition: all .3s ease-in-out;
    text-decoration: none;

    &:hover {
        background-color: var(--blue-cookie-hover);//var(--blue-start-hover);
        cursor: pointer;
    }

    /* &:active {
        background-color: var(--blue-start-active);
        transform: scale(1.14);
    } */
`;

export const StartButton = () => {
    return (
        <Start to="/start">Начать</Start>
    )
}