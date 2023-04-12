import React from "react"
import Password from "assets/images/forms/passwords/password.png"
import Letter from "assets/images/forms/passwords/letter.png"
import Loop from "assets/images/forms/passwords/loop.png"
import styles from "./FormImages.module.scss"


export const PasswordsImage = () => {
    return (
        <div className={styles.passwordImageWrapper}>
            <div className={styles.leftImage}>
                <img className="image-adaptive" src={Password} alt="Man and a password" />
            </div>
            <div className={styles.rightImage}>
                <div className={styles.rightTopImage}>
                    <img className="image-adaptive" src={Letter} alt="Letter" />
                </div>
                <div className={styles.rightBottomImage}>
                    <img className="image-adaptive" src={Loop} alt="Loop" />
                </div>
            </div>
        </div>
    )
}