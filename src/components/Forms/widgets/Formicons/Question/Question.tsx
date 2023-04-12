import React from "react"
import QuestionIcon from "assets/images/forms/Question.svg"
import styles from "./Question.module.scss"


export const Question = (
{
    title
} : {
    title: string
}) => {
    return (
        <span className={styles.question}>
            <img src={QuestionIcon} alt="question" title={title}/>
        </span>
        /* Для следубщего релиза
        <span className={styles.question}><img src={QuestionIcon} alt="question"/>
            <span className={styles.prompt}>{title}</span>
        </span>
        */
    )
}

export const QuestionName = () => {
    return (
        <Question title={`Содержит русские или английские буквы, пробел и тире. 
Длина не менее 1 и не более 50 символов.`}/>
    )
}

export const QuestionEmail = () => {
    return (
        <Question title={`Содержит английские буквы, спецсимволы или цифры.
Должен содержать символ @. 
Не содержит символ пробела и Enter.
Длина не более 254 символов.`}/>
    )
}

export const QuestionPassword = () => {
    return (
        <Question title={`Содержит английские буквы, цифры или спецсимволы ! - @ # $ % ^ & * / | ( ) { } : ;
Длина не менее 6 и не более 50 символов.`}/>
    )
}

export const QuestionComment = () => {
    return (
        <Question title={`Содержит русские или английские буквы, цифры, спецсимволы ,./()*-+=-_!"№;%:? 
Длина не более 600 символов.`} />
    )
}