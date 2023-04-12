import React, { ReactNode } from "react"
import styles from "./AppFooter.module.scss"
import { AppLogo } from "components/common/AppLogo/AppLogo"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "store/hooks"
import { selectLang } from "store/langSlice"


export const AppFooter = () => {
    const currentLang = useAppSelector(selectLang)

    return (
        <footer className={`main-container ${styles.appFooter}`}>
            <div className={styles.logoWrapper}>
                <AppLogo/>
                <p className={styles.copyright}>All Rights Reserved, {new Date().getFullYear()}</p>
            </div>
            <div className={styles.linksWrapper}>
                <TextLink to="/terms">
                    {currentLang === "RU" ? "Пользовательское соглашение" : "Terms of service"}
                </TextLink>
                <TextLink to="/privacy">
                    {currentLang === "RU" ? "Политика конфиденциальности" : "Privacy statement"}
                </TextLink>
            </div>
        </footer>
    )
}


const TextLink = ({
    to,
    children
} : {
    to: string
    children: ReactNode
}) => {
    return (
        <NavLink className={styles.text} to={to}>
            { children }
        </NavLink>
    )
}