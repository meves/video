import React, { ReactNode } from "react"
import styles from "./PersonalArea.module.scss"


export const PersonalAreaContainer = ({
    children
} : {
    children: ReactNode
}) => {
    return (
        <div className={styles.personalAreaContanier}>
            { children }
        </div>
    )
}