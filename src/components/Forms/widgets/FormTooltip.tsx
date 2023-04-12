import React, { FC, ReactNode, useCallback, useEffect } from "react"
import styled from "styled-components"


export const TooltipWrapper = styled.div`
    position: absolute;
    left: 0%;
    top: -10%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 15px;
    padding: 8px 12px;
    font-size: 18px;
    color: var(--white);
    background-color: red;

    &:hover {
        cursor: pointer;
    }
`;

type Props = {
    children: ReactNode
    setErrorMessage: (errormessage: string) => void
}

export const FormTooltip: FC<Props> = ({ children, setErrorMessage }) => {
    useEffect(() => {
        const timerId = setTimeout(() => {
            setErrorMessage("")
        }, 5000)
        return () => {
            clearTimeout(timerId)
        }
    }, [setErrorMessage])

    const handleClocseTooltipOnClick = useCallback(() => {
        setErrorMessage("")
    }, [setErrorMessage])

    return (
        <TooltipWrapper
            onClick={handleClocseTooltipOnClick}
            title="Нажмите, чтобы закрыть"
        >{ children }</TooltipWrapper>
    )
}