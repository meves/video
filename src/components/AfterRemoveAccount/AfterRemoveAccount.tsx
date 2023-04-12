import React from "react"
import { NavLink } from "react-router-dom";
import RemovedAccountImage from "assets/images/removed_account/removed_account.png"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"


const Title = styled.h2`
    margin: 0;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.6;
    text-align: center;

    &:last-of-type {
        margin-bottom: 32px;
    }
`;

const Link = styled(NavLink)`
    margin-bottom: 90px;
    padding: 20px 117px;
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: var(--white);
    border: 1px solid var(--blue-accent);
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: var(--blue-accent);
    }

    &:active {
        color: var(--black);
        background-color: var(--blue-start-hover);
    }
`;

const Image = styled.img`
    display: block;
    max-width: 460px;
    width: 100%;
`;

const titleText = [
    'Очень жаль, что вы решили не использовать наш сервис.',
    'Все ваши данные, видео и аудиофайлы стерты с нашего сервера.',
    'Надеемся на ваше возвращение!'
];

export const AfterRemoveAccountPageContainer = () => {
    return (
        <>
            {titleText.map(line => (
                <Title key={uuidv4()}>{line}</Title>
            ))}
            <Link to="/">На главную</Link>
            <Image src={RemovedAccountImage} alt="Removed account"/>
        </>
    )
}