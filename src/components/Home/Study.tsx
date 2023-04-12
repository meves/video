import React from "react"
import styles from "./Home.module.scss"
import TalkImage from "assets/images/home/study/talk.png"
import ListenImage from "assets/images/home/study/listen.png"
import SeeImage from "assets/images/home/study/see.png"
import CommentImage from "assets/images/home/study/comment.png"
import { v4 as uuidv4 } from "uuid"


export const Study = () => {
    return (
        <section className={styles.study}>
            <h1 className={styles.headingOne}>С TalkAboutAll ты научишься</h1>
            <StudyCards/>
        </section>
    )
}

const cards = [
    {
        id: 1,
        title: "ГОВОРИТЬ",
        text: [`В\u00A0процессе ты неизменно учишься улавливать речевые и\u00A0грамматические ошибки, отмечаешь слова-паразиты 
                и\u00A0начинаешь использовать те\u00A0слова, которые ты вряд\u00A0ли используешь в\u00A0повседневной речи.`],
        image: TalkImage,
        alt: "Talk"
    },
    {
        id: 2,
        title: "СЛУШАТЬ",
        text: [`Услышав себя со\u00A0стороны, ты в\u00A0спокойной обстановке можешь проанализировать услышанное и\u00A0оценить свой монолог
                по качеству используемых слов, наличию пауз, скорости и как\u00A0угодно еще.`],
        image: ListenImage,
        alt: "Listen"
    },
    {
        id: 3,
        title: "ВИДЕТЬ",
        text: [`На\u00A0видео ты оценишь не\u00A0только себя и\u00A0свой внешний вид, но\u00A0и\u00A0окружающую тебя обстановку. Возможно впереди
                тебя ждет интервью или другая важная видео-конференция и\u00A0гладильная доска за\u00A0твоей спиной окажется не\u00A0лучшим 
                фоном. Артикуляция, жестикуляция, зрительный контакт, поза или освещение — нюансов, на\u00A0которые 
                можно обратить внимание, десятки.`],
        image: SeeImage,
        alt: "See"
    },
    {
        id: 4,
        title: "КОММЕНТИРОВАТЬ",
        text: [`Через 24\u00A0часа после записи тебе откроется доступ к\u00A0материалам и ты\u00A0сможешь оставить комментарий, 
                который увидишь только\u00A0ты. Это может быть что угодно: похвала, оценка прогресса, заметки 
                на\u00A0будущее, на\u00A0что обратить внимание в\u00A0следующий раз.`, 
                `И\u00A0да, мы\u00A0рекомендуем тебе оставлять письменные 
                комментарии. Почему? Потому что доказано, что написанное или озвученное усваивается гораздо лучше, 
                чем\u00A0то, что было проговорено про\u00A0себя.`],
        image: CommentImage,
        alt: "Comment"
    },
]

const StudyCards = () => {
    return (
        <div className={styles.studyCards}>
            {cards.map(card => (
                <div 
                    key={card.id}
                    className={`${styles.studyCard} ${card.id%2 === 0 ? styles.reverseCard : ""}`} 
                >
                    <div className={styles.imageBlock}>
                        <img className={card.id === 1 || card.id === 4 ? styles.image : styles.imageSmall} src={card.image} alt={card.alt} />
                    </div>
                    <div className={styles.textBlock}>
                        <h2 className={styles.cardTitle}>{card.title}</h2>
                        {card.text.map(text => <p key={uuidv4()} className={styles.cardText}>{text}</p>)}
                    </div>
                </div>
            ))}
        </div>
    )
}