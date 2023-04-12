import styled from "styled-components"


const MarkWrapper = styled.span`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99;
    opacity: .6;
`;

export const TemporaryMark = ({
    text
} : {
    text: string
}) => {
    return (
        <MarkWrapper>
            { text }
        </MarkWrapper>
    )
};