import React from "react"
import { NavLink } from "react-router-dom"
import { terms } from "./data";
import { v4 as uuidv4 } from "uuid"

import styles from "./Legal.module.scss"

export const TermsOfServise = () => {
    return (
        <section className={styles.sectionWrapper}>
            <div className={styles.dataWrapper}>
                <p className={styles.data}>Последнее обновление: Март 2023 г.</p>
            </div>
            <div className={styles.contentWrapper}>

                <h2 className={styles.contentHeading}>Пользовательское соглашение</h2>
                <h3 className={styles.contentTitle}>
                    1. Ваши отношения с нами 
                </h3> 
                <p className={styles.contentText}>
                    Добро пожаловать в <NavLink className={styles.contentLink} to="/">TalkAboutAll</NavLink> (далее - «Платформа»).<br/> 
                    Вы читаете пользовательское соглашение (далее - “Пользовательское соглашение”), которое 
                    регулирует отношения между вами и Платформой и устанавливает условия, на основании которых 
                    вы можете получать доступ и использовать Платформу, наши веб-сайты, услуги, приложения, 
                    продукты и контент (вместе “Услуги”, “Сервисы”). Наши Услуги предоставляются для частного, 
                    некоммерческого использования. Для целей настоящего Соглашения “вы” и “ваш” означает вас 
                    как пользователя Услуг.<br/>
                    Настоящее Пользовательское соглашение представляет собой юридически обязывающее 
                    соглашение между нами. Пожалуйста, внимательно прочитайте его.
                </p>
                
                { terms.map(termsItem => (
                    <React.Fragment key={termsItem.id}>
                        { termsItem.h5level ? 
                            termsItem.h5level.map((item: {id: number, 
                                                            title?: string, 
                                                            text?: string, 
                                                            list?: string[], 
                                                            numeralList?: string[], 
                                                            hyphenList?: string[]
                                }) => (
                                <div key={item.id}>
                                    {item.title ? <h5 className={styles.contentTitle}>{ item.title }</h5> : null}
                                        <>
                                        { item.text ? <p className={styles.contentText}>{item.text}</p> : null}
                                        { item.list ? 
                                            <ul className={styles.contentList}>
                                                {item.list.map((listItem: string) => (
                                                    <li className={styles.contentListItem} key={uuidv4()}>{ listItem }</li>
                                                ))}
                                            </ul>  
                                            : null 
                                        } 
                                        { item.numeralList ?
                                            <ul className={styles.numeralList}>
                                                {item.numeralList.map((listItem: string) => (
                                                    <li className={styles.contentListItem} key={uuidv4()}>{ listItem }</li>
                                                ))}
                                            </ul>
                                            : null 
                                        }
                                        { item.hyphenList ?
                                        <ul className={styles.hyphenList}>
                                            {item.hyphenList.map((listItem: string) => (
                                                <li className={styles.contentListItem} key={uuidv4()}>{ listItem }</li>
                                            ))}
                                        </ul>
                                        : null 
                                        }
                                        </>
                                </div>
                            )) 
                            : null 
                        }
                    </React.Fragment>
                )) }
                
            </div>
        </section>
    )
}