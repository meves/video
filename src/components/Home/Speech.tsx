import React from "react"
import styles from "./Home.module.scss"
import { StartButton } from "components/Home/widgets/StartButton"


export const Speech = () => {
    return (
        <section className={styles.speech}>
            <div className={styles.circle}/>
            <div className={styles.circle}/>
            <div className={styles.circle}/>
            <div className={styles.textBlock}>
                <h2 className={styles.heading}>
                    Развивай свою речь и мышление самостоятельно
                    в комфортных условиях прямо сейчас
                </h2>
                <StartButton/>
            </div>
        </section>
    )
}