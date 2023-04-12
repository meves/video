import React from "react"
import ThanksPhoto from "assets/images/forms/thanks_for_registration.png"
import styled from "styled-components"


const ThankImageWrapper = styled.div`
    margin-left: 73px;
    max-width: 522px;

    @media screen and (max-width: 1300px) {
        margin-left: 40px; 
    }

    @media screen and (max-width: 900px) {
        margin-left: 20px; 
    }
`;

const Image = styled.img`
    width: 100%;
    display: block;
`;

export const ThankImage = () => {
    return (
        <ThankImageWrapper>
            <Image src={ThanksPhoto} alt="Thank for registration" />
        </ThankImageWrapper>
    )
}