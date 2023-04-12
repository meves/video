import React from "react"
import styles from "./Home.module.scss"
import { StartButton } from "components/Home/widgets/StartButton"
import SummaryImage from "assets/images/home/summary.png"

export const Summary = () => {
    return (
        <section className={styles.summary}>
            <div className={styles.textBlock}>
                <h2 className={styles.title}>В TalkAboutAll</h2>
                <h3 className={styles.subTitle}>
                    Ты видишь изображение — это может быть закат, или диван, 
                    или панда — и&nbsp;твоя задача описать увиденное сначала 
                    с&nbsp;положительной стороны, потом с&nbsp;отрицательной 
                    и&nbsp;подвести итог.
                </h3>
                <StartButton/>
            </div>
            <div className={styles.summaryImageWrapper}>
                <img className={styles.summaryImage} src={SummaryImage} alt="Work on yourself" />
            </div>
        </section>
    )
}