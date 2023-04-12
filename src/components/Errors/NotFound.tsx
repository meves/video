import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { selectError_400, selectError_400_InitialText, setError_400 } from "store/errorSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import leftSide from '../../assets/images/errors/sideL.png'
import rightSide from '../../assets/images/errors/sideR.png'
import styles from './Errors.module.scss'


export const NotFoundContainer = () => {
    const initialErrorText = useAppSelector(selectError_400_InitialText)
    const errorText = useAppSelector(selectError_400)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(setError_400(""))
        }
    }, [dispatch])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.leftWtapper}>
                <img src={leftSide} className={styles.sideImage} alt="Moon" />
            </div>
            <div className={styles.middleWrapper}>
                <h4 className={styles.heading}>
                    { errorText ? errorText : initialErrorText }
                </h4>
                <NavLink className={styles.button} to="/">
                    На&nbsp;главную
                </NavLink>
            </div>
            <div className={styles.rightWtapper}>
                <img src={rightSide} className={styles.sideImage} alt="Astranaut" />
            </div>
        </div>
    )
}