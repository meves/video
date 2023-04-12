import React from "react"
import { NavLink } from "react-router-dom"
import styles from './ThankMessage.module.scss'


// const message = `Спасибо за регистрацию!\nПисьмо с подтверждением отправлено\nвам на почту. После подтверждения аккаунта\nзапись будет активна.`

export const ThankMessage = () => {
    return (
        <div className={styles.textBlock}>
            <p className={styles.text}
            >Спасибо за регистрацию!
            </p>
            <p 
                className={styles.text}
            >Письмо с подтверждением отправлено вам на почту. После подтверждения аккаунта запись будет активна.
            </p>
            <NavLink className={styles.link} to="/">На главную</NavLink>
        </div>
    )
}