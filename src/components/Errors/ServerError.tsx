import React, { useEffect } from "react"
import { appURL } from "api/api"
import serverError from '../../assets/images/errors/serverError.png'
import styles from './Errors.module.scss'
import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectError_500, selectError_500_InitialText, setError_500 } from "store/errorSlice"


export const ServerErrorContainer = () => {
    const initialErrorText = useAppSelector(selectError_500_InitialText)
    const errorText = useAppSelector(selectError_500)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(setError_500(""))
        }
    }, [dispatch])

    return (
        <div className={styles.serverErrorWrapper}>
            <h4 className={styles.heading}>
                { errorText ? errorText : initialErrorText }
            </h4> 
            <a href={appURL} className={styles.button}>Перезагрузить</a>
            <div className={styles.imageWrapper}>
                <img src={serverError} className={styles.serverErrorImage} alt="Error" />
            </div>
        </div>
    )
}