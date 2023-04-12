import React from "react"
import styles from "./PersonalArea.module.scss"
import Webinar from "assets/images/personal_area/Webinar.png"
import VideoFiles from "assets/images/personal_area/Video_files.png"
import { NavLink } from "react-router-dom"

export const PersonalAreaImagesBlock = () => {
    return (
        <div className={styles.imagesWrapper}>
            <NavLink to="/mynotes" className={styles.imagesCard}>
                <p className={styles.text}>
                    Смотреть мои записи
                </p>
                <div className={styles.imageBlock}>
                    <img className="image-adaptive" src={Webinar} alt="Webinar" />
                </div>
            </NavLink>
            <NavLink to="/start" className={styles.imagesCard}>
                <div className={styles.imageBlock}>
                    <img className="image-adaptive" src={VideoFiles} alt="Video files" />
                </div>
                <p className={styles.text}>
                    Давай начнем записывать видео
                </p>
            </NavLink>
        </div>
    )
}