import React from "react"
import styles from "./LoginForm.module.scss"


export const RegistrationConfirmed = ({
    children
} : {
    children: string
}) => {
    return (
        <p className={styles.successTitle}>
            { children }
        </p>
    )
}