import React from "react"
import styled from "styled-components"
import { SmallColumnBlock, LargeColumnBlock } from "components/common/SVG/Columns"


const InfoWrapper = styled.div`
    max-width: 449px;
`;

const Title = styled.div`
    margin: 35px 0 43px;
    font-family: var(--open-sans);
    font-weight: 700;
    font-size: 32px;
    line-height: 1.3;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 32px;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Item = styled.li`
    display: flex;
    align-items: center;
`;

const Text = styled.p`
    margin: 0 0 0 24px;
    padding: 0;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    white-space: pre;
`;

const listItems = [
    { id: 1, text: "В два этапа по 90 секунд,\n опишите  положительные и отрицательные\n характеристики предмета." },
    { id: 2, text: "Подведите итоги.\n Дополните речь, сделайте итоговую оценку." },
    { id: 3, text: "Справились раньше, отлично!\n Нажмите кнопку \"готово\",\n чтобы перейти к следующему блоку." },
    { id: 4, text: "Поздравляем! Вы записали видео!\n Приходите посмотреть через 24 часа." }
]

export const InfoBlock = () => {
    
    return (
        <InfoWrapper>
            <Title>
                Записывая видео опишите изображение
            </Title>
            <List>
                { listItems.map(item => (
                    <Item key={item.id}>
                        {item.id % 2 !== 0 ? <LargeColumnBlock/> : <SmallColumnBlock/>}
                        <Text>{ item.text }</Text>                            
                    </Item>                    
                )) }
                
            </List>
        </InfoWrapper>
    )
}