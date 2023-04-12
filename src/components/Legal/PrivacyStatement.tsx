import React from "react"
import { NavLink } from "react-router-dom"
import { privacies } from "./data";
import { v4 as uuidv4 } from "uuid"

import styles from "./Legal.module.scss"

export const PrivacyStatement = () => {
    return (
        <section className={styles.sectionWrapper}>
            <div className={styles.dataWrapper}>
                <p className={styles.data}>Последнее обновление: 06 февраля 2023 г.</p>
            </div>
            <div className={styles.contentWrapper}>

                <h2 className={styles.contentHeading}>Политика конфиденциальности</h2>
                <p className={styles.contentText}>
                    Добро пожаловать в <NavLink className={styles.contentLink} to="/">TalkAboutAll</NavLink> (далее - «Платформа»).<br/> 
                    Мы стремимся защищать и уважать вашу частную жизнь. Эта Политика объясняет наш подход 
                    к
                    персональным данным, которые мы получаем от вас или которые вы нам предоставляете. Если вы
                    не согласны с этой Политикой, вам не следует использовать Платформу.
                    Если у вас есть вопросы о том, как мы используем вашу информацию, пожалуйста, свяжитесь с
                    нами.
                </p>
                
                { privacies.map(privacyItem => (
                    <React.Fragment key={privacyItem.id}>
                        { privacyItem.h3title ? <h3 className={styles.contentTitle}>{ privacyItem.h3title }</h3> : null }
                        { privacyItem.h4title ? <h4 className={styles.contentSubtitleLone}>{ privacyItem.h4title }</h4> : null }
                        { privacyItem.text ? <p className={styles.contentText}>{ privacyItem.text }</p> : null }
                        { privacyItem.list ? 
                            (<ul className={styles.contentList}>
                                {privacyItem.list.map(item => (
                                    <li className={styles.contentListItem} key={uuidv4()}>{ item };</li>
                                ))}
                            </ul>) 
                            : null 
                        }
                        { privacyItem.h5level ? 
                            privacyItem.h5level.map((item: {id: number, title: string, text: string, list?: string[]}) => (
                                <div key={item.id}>
                                    <h5 className={styles.contentSubtitle}>{ item.title }</h5>
                                    <p className={styles.contentText}>
                                        <>
                                        { item.text }
                                        { item.list ? 
                                            item.list.map((listItem: string) => (
                                                <li className={styles.contentListItem} key={uuidv4()}>{ listItem };</li>
                                            ))  
                                            : null 
                                        }    
                                        </>
                                    </p>
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