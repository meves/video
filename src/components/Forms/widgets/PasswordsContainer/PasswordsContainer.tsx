import React, { ReactNode } from "react"
import styles from "./PasswordsContainer.module.scss"


export const PasswordsContainer = ({
    children
} : {
    children: ReactNode
}) => {
    return (
        <div className={styles.passwordsContanier}>
            { children }
        </div>
    )
}