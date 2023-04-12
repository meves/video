import React, { ChangeEvent, ReactNode, useCallback } from "react"
import styles from "./AppHeader.module.scss"
import { NavLink } from "react-router-dom"
import { AppLogo } from "components/common/AppLogo/AppLogo"
import { ArrowDownSelect } from "components/common/SVG/ArrowDownSelect"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectIsAuth } from "store/authSlice"
import { selectLang, setLangThunk } from "store/langSlice"
import { Langs } from "store/types"


export const AppHeader = () => {
    const currentLang: Langs = useAppSelector(selectLang)

    return (
        <header className={styles.appHeader}>
            <div className={`main-container ${styles.headerContent}`}>
                <div className={styles.left}>
                    <AppLogo/>
                    <ButtonLink to="/faq">
                        {currentLang === Langs.RU ? "Частые вопросы" : "FAQ"}
                    </ButtonLink>
                </div>
                <div className={styles.right}>
                    <LangsSelect/>
                    <UserLogin/>
                </div>
            </div>
        </header>
    )
}


const LangsSelect = () => {
    const currentLang = useAppSelector(selectLang)

    const dispatch = useAppDispatch()

    const handleSelectOnChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLangThunk(event.currentTarget.value as Langs))
        
    }, [dispatch])

    return (
        <div className={styles.selectBlock}>
            <select 
                value={currentLang}
                onChange={handleSelectOnChange} 
                className={styles.langsList} 
                name="lang"
            >
                <option>{ Langs.RU }</option>
                <option>{ Langs.EN }</option>
            </select>
            <ArrowDownSelect 
                width="12"
                height="6"
                fill="none"
                stroke="#F1F2F3"
                strokeWidth="2"
            />
        </div>

    )
}


const UserLogin = () => {
    const isAuth: boolean = useAppSelector(selectIsAuth)
    const currentLang: Langs = useAppSelector(selectLang)

    return (
        <div className={styles.loginBlock}>
            {isAuth ?
            <ButtonLink to="/lk">
                {currentLang === Langs.RU ? "Личный кабинет" : "Personal area"}
            </ButtonLink>            
            :
            <>
            <NavLink className={styles.loginLink} to="/login">
                {currentLang === Langs.RU ? "Войти" : "Login"}
            </NavLink>
            <ButtonLink to="/registration" extraClass="btnLink_blue">
                {currentLang === Langs.RU ? "Зарегистрироваться": "Register"}
            </ButtonLink>
            </>
            }
        </div>
    )
}


const ButtonLink = ({
    children,
    to,
    extraClass
} : {
    children: ReactNode
    to: string
    extraClass?: string
}) => {
    return (
        <NavLink className={`${styles.btnLink} ${extraClass ? styles[extraClass] : ''}`} to={to}>
            { children }
        </NavLink>
    )
}