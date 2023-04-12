import React, { MouseEvent, useCallback, useState } from "react"
import { Minus, Plus } from "components/common/SVG/AccordeonItems";
import { faqs } from "./data";
import styled from "styled-components"


const Title = styled.h2`
    margin: 0;
    margin-bottom: 39px;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.3;
`

const FAQList = styled.ul`
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;
    list-style-type: none;
    padding-left: 0;
`;

const FAQListItem = styled.li`
    border-bottom: 1px solid #B0B3B8;
`;

const QuestionWrapper = styled.div`
    display: flex;
    align-items: baseline;

    &:hover {
        cursor: pointer;
    }
`;

const Question = styled.h3`
    /* max-width: 900px; */
    max-width: 1200px;
    margin: 0;
    margin-bottom: 19px;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.6;
`;

const Answer = styled.p`
    max-width: 900px;
    margin: 0;
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    /* white-space: pre; */
`;

const Sign = styled.span`
    margin-left: auto;
`

export const FAQPageContainer = () => {
    const [currentOpenItems, setCurrentOpenItems] = useState<number[]>([])
    

    const handleToggleAnswerOnClick = useCallback(((event: MouseEvent<HTMLParagraphElement>) => {
        const question = event.currentTarget
        const answer = question.nextElementSibling

        if (answer) {
            answer.classList.toggle("hiddenItem")
        }
        setCurrentOpenItems(prevCurrentOpenItems => {
            if (question.dataset.id) {
                const currentId: number = +question.dataset.id
                if (prevCurrentOpenItems.includes(currentId)) {
                    return prevCurrentOpenItems.filter(val => val !== currentId)
                } else {
                    return [...prevCurrentOpenItems, currentId]
                }
            }
            return prevCurrentOpenItems
        })
    }), [])

    return (
        <>
            <Title>
                Мы приготовили для вас ответы на частые вопросы.
            </Title>
            <FAQList>
                { faqs.map(faqItem => (
                    <FAQListItem key={faqItem.id}>
                        <QuestionWrapper 
                            data-id={faqItem.id}
                            onClick={handleToggleAnswerOnClick}
                        >
                            <Question>{ faqItem.question }</Question>
                            <Sign>
                                { currentOpenItems.some(id => id === faqItem.id) ? <Minus/> : <Plus/> }
                            </Sign> 
                        </QuestionWrapper>
                        <Answer className="hiddenItem">{ faqItem.answer }</Answer>
                    </FAQListItem>
                )) }
            </FAQList>
        </>
    )
}
