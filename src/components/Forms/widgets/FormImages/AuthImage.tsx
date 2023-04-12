import React from "react"
import AuthPhoto from "assets/images/forms/login.png"
import styles from "./FormImages.module.scss"


export const AuthImage = () => {
    return (
        <div className={styles.authImageWrapper}>
            <img className="image-adaptive" src={AuthPhoto} alt="Login/Register" />
        </div>
    )
}