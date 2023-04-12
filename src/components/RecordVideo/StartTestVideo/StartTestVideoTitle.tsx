import React from "react"
import styled from "styled-components";


const Title = styled.h2`
    max-width: 476px;
    margin: 0 auto 32px;
    color: var(--white);
    font-family: var(--open-sans);
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    text-align: center;
`;

export const StartTestVideoTitle = () => {
    return (
        <Title>
            Тестовая запись длится не более 30 секунд, ее можно остановить в любой момент для просмотра
        </Title>
    )
}