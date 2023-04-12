import React from "react"
import styles from "./Home.module.scss"
import BannerImage from "assets/images/home/banner.png"
import { StartButton } from "components/Home/widgets/StartButton"

export const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.textBlock}>
                <h1 className={styles.headingOne}>Тренируй <span className={styles.headingOneWhite}>свою устную</span> речь</h1>
                <p className={styles.bannerText}>Описывай различные предметы, которые увидишь на экране и развивай свое мышление</p>
                <StartButton/>
            </div>
            <div className={styles.bannerImageWrapper}>
                <img className={styles.bannerImage} src={BannerImage} alt="Banner"/>
            </div>
        </section>
    )
}