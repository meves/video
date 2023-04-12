import React, { useCallback } from "react"
import styles from "./Content.module.scss"
import { useClick } from "../hooks"
import { useNavigate } from "react-router-dom"
import { SubmitEmailForm } from "components/Forms/SubmitEmailForm/SubmitEmailForm"
import CookieImage from "assets/images/cookie.png"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { 
    setAfterFirstVideoModalOpen, 
    setAfterPasswordRecoveryModalOpen,
    setAfterSecondVideoModalOpen,
    setAfterThirdVideoModalOpen,
    setCookieModalOpen, 
    setPasswordResetModalOpen, 
    setRecordModalOpen, 
    setVideoNotSentModalOpen
} from "store/modalSlice"
import { setEmailAlreadyRegisteredModalOpen } from "store/modalSlice"
import { 
    resetVideoNumber, 
    selectStream, 
    setDescribedSideThunk, 
    setPausingVideo, 
    setPreparingVideo, 
    setRecordingVideo, 
    setStoppingVideo, 
    setStream, 
} from "store/videoRecordSlice"
import { getThemeThunk } from "store/themeSlice"


// for stub
export const Stub = ({
    setIsOpen
} : {
    setIsOpen: (isOpen: boolean) => void
}) => {
    const handleOnClick = useClick(setIsOpen)

    return (
        <div className={styles.modalStub}>
            <p className={styles.popup__text}>
                Спасибо за интерес.
            </p>
            <p className={styles.popup__text}>
                Сайт находится на стадии реконструкции.
            </p>
            <p className={styles.popup__text}>
                Следите за новостями в нашем телеграмм канале
            </p>
            <div className={styles.popup__buttons}>
                <a 
                    href="https://t.me/talk_aboutall" 
                    target="_blank" rel="noreferrer"
                    className={`${styles.popup__button} ${styles.popup__button_forvard}`}>
                        Наш телеграм
                </a>
                <button 
                    onClick={handleOnClick}
                    className={`${styles.popup__button} ${styles.popup__button_back}`}>
                        На главную
                </button>
            </div>
        </div>
    )
}

// for popups
export const PopUpRecord = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const stream = useAppSelector(selectStream)

    const handleContinueRecordOnClick = useCallback(() => {
        dispatch(setRecordModalOpen(false))
    }, [dispatch])

    const handleCancelRecordOnClick = useCallback(() => {
        stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        dispatch(setRecordingVideo(false))
        dispatch(setRecordModalOpen(false))
        navigate("/")
    }, [dispatch, navigate, stream])

    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "60px", paddingBottom: "59px"}}            
        >
            <p 
                style={{maxWidth: "386px"}} 
                className={styles.title}>
                Вы уверены, что хотите отменить запись? 
                После подтверждения отмены вы будете 
                перенаправлены на главную страницу. 
                Изображение будет сгенерировано заново.
            </p>
            <div className={styles.buttons}>
                <button
                    className={styles.blueButton}
                    onClick={handleContinueRecordOnClick}
                >Нет, продолжить запись
                </button>
                <button
                    onClick={handleCancelRecordOnClick}
                    className={styles.whiteButton}
                >
                    Да, отменить запись
                </button>
            </div>
        </div>
    )
}

export const PopUpAfterFirstVideo = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const stream = useAppSelector(selectStream)

    const handleMoveToNextImageOnClick = useCallback(() => {
        dispatch(setAfterFirstVideoModalOpen(false))
        dispatch(setPausingVideo(false))
        dispatch(setStoppingVideo(false))
        dispatch(setPreparingVideo(true))
        dispatch(resetVideoNumber())
        dispatch(setDescribedSideThunk())
        dispatch(getThemeThunk())
    }, [dispatch])

    const handleMoveToHomePageOnClick = useCallback(() => {
        stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        dispatch(setAfterFirstVideoModalOpen(false))
        navigate("/")
    }, [stream, dispatch, navigate])

    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "80px", paddingBottom: "89px"}}
        >
            <p style={{maxWidth: "658px"}} className={styles.title}>
                Просмотреть видео можно будет через 24 часа в своем личном кабинете.
                А пока предлагаем описать еще два изображения.
            </p>
            <div className={styles.buttons}>
                <button 
                    onClick={handleMoveToNextImageOnClick}
                    className={styles.blueButton}>
                        Следующее изображение
                </button>
                <button 
                    onClick={handleMoveToHomePageOnClick} 
                    className={styles.whiteButton}>
                        На главную
                </button>
            </div>
        </div>
    )
}

export const PopUpAfterSecondVideo = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const stream = useAppSelector(selectStream)

    const handleMoveToNextImageOnClick = useCallback(() => {
        dispatch(setAfterSecondVideoModalOpen(false))
        dispatch(setPausingVideo(false))
        dispatch(setStoppingVideo(false))   
        dispatch(setPreparingVideo(true))   
        dispatch(resetVideoNumber()) 
        dispatch(setDescribedSideThunk())
        dispatch(getThemeThunk())
    }, [dispatch])

    const handleMoveToHomePageOnClick = useCallback(() => {
        stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        dispatch(setAfterSecondVideoModalOpen(false))
        navigate("/")
    }, [stream, dispatch, navigate])
    
    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "80px", paddingBottom: "89px"}}
        >
            <p style={{maxWidth: "658px"}} className={styles.title}>
                Просмотреть видео можно будет через 24 часа в своем личном кабинете. 
                А пока предлагаем описать еще одно изображение.
            </p>
            <div className={styles.buttons}>
                <button 
                    onClick={handleMoveToNextImageOnClick} 
                    className={styles.blueButton}>
                        Следующее изображение
                </button>
                <button
                    onClick={handleMoveToHomePageOnClick} 
                    className={styles.whiteButton}>
                        На главную
                </button>
            </div>
        </div>
    )
}

export const PopUpAfterThirdVideo = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const stream = useAppSelector(selectStream)

    const resetStreamAndCloseModal = useCallback(() => {
        stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        dispatch(setAfterThirdVideoModalOpen(false))
        dispatch(resetVideoNumber())
    }, [stream, dispatch])

    const handleMoveToPersonalAreaOnClick = useCallback(() => {
        resetStreamAndCloseModal()
        navigate("/lk")
    }, [navigate, resetStreamAndCloseModal])

    const handleMoveToHomePageOnClick = useCallback(() => {
        resetStreamAndCloseModal()
        navigate("/")
    }, [navigate, resetStreamAndCloseModal])
    
    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "85px", paddingBottom: "84px"}}
        >
            <p style={{maxWidth: "595px"}} className={styles.title}>
                В базовой версии приложения доступна запись трех видео в день. 
                Возьми перерыв и возвращайся завтра.
            </p>
            <div className={styles.buttons}>
                <button 
                    onClick={handleMoveToPersonalAreaOnClick} 
                    className={styles.blueButton}>
                        Личный кабинет
                </button>
                <button
                    onClick={handleMoveToHomePageOnClick}
                    className={styles.whiteButton}>
                        На главную
                </button>
            </div>
        </div>
    )
}

export const PopUpVideoNotSent = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const stream = useAppSelector(selectStream)
    
    const resetStreamAndCloseModal = useCallback(() => {
        stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
        dispatch(setStream(null))
        dispatch(setVideoNotSentModalOpen(false))
        dispatch(resetVideoNumber())
    }, [stream, dispatch])

    const handleMoveToHomePageOnClick = useCallback(() => {
        resetStreamAndCloseModal()
        navigate("/")
    }, [navigate, resetStreamAndCloseModal])
    
    const handleRecordMoreVideoOnClick = useCallback(() => {
        dispatch(setVideoNotSentModalOpen(false))
        dispatch(resetVideoNumber())
        navigate("/record")
    }, [dispatch, navigate])

    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "85px", paddingBottom: "84px"}}
        >
            <p style={{maxWidth: "595px"}} className={styles.title}>
                Видео не отправлено.
            </p>
            <div className={styles.buttons}>
                <button 
                    onClick={handleRecordMoreVideoOnClick} 
                    className={styles.blueButton}>
                        Записать еще раз
                </button> : null
                <button
                    onClick={handleMoveToHomePageOnClick}
                    className={styles.whiteButton}>
                        На главную
                </button>
            </div>
        </div>
    )
}

// согласие на удаления учетной записи
export const PopUpSubmitRemove = ({
    setIsOpen,
    setIsFormOpen
} : {
    setIsOpen: (isOpen: boolean) => void
    setIsFormOpen: (isFormOpen: boolean) => void
}) => {
    const handleCancelOnClick = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    const handleSubmitRemoveAccountOnClick = useCallback(() => {
        setIsOpen(false)
        setIsFormOpen(true)
    }, [setIsOpen, setIsFormOpen])

    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "60px", paddingBottom: "59px"}}
        >
            <p style={{maxWidth: "687px"}} className={styles.title}>
                Удаление учетной записи безвозвратно.<br/>
                После подтверждения удаления все ваши данные, видео и аудиофайлы будут 
                полностью стерты с нашего сервера без возможности восстановления.
                Вы уверены, что хотите удалить учетную запись?
            </p>
            <div className={styles.buttons}>
                <button 
                    style={{padding: "16px 56px"}}
                    className={styles.blueButton}
                    onClick={handleSubmitRemoveAccountOnClick}>
                        Удалить
                </button>
                <button
                    style={{padding: "16px 56px"}}
                    className={styles.whiteButton}
                    onClick={handleCancelOnClick}>
                        Отмена
                </button>
            </div>
        </div>
    )
}

// подтверждение удаления учетной записи
export const PopUpSubmitEmail = ({
    setIsOpen
} : {
    setIsOpen: (isOpen: boolean) => void
}) => {
    const handleOnClick = useClick(setIsOpen)

    return (        
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "72px", paddingBottom: "55px"}}
        >
            <p style={{maxWidth: "564px"}} className={styles.title}>
                Для удаления учетной записи введите свою электронную почту
            </p>
            <SubmitEmailForm
                handleCancelOnClick={handleOnClick}
            />            
        </div>
    )
}

// Письмо для восстановления пароля отправлено на почту
export const PopUpPasswordReset = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleSetResetPasswordSentOnClick = useCallback(() => {
        dispatch(setPasswordResetModalOpen(false))
        navigate("/")
    }, [navigate, dispatch])

    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "65px", paddingBottom: "85px"}}    
        >
            <p className={styles.title}>
                Письмо для восстановления пароля отправлено на почту
            </p>
            <div className={styles.buttons}>
                <button
                    onClick={handleSetResetPasswordSentOnClick} 
                    className={styles.whiteButton}>
                        На главную
                </button>
            </div>
        </div>
    )
}

// Попап после успешного восстановления пароля:
export const PopUpAfterPasswordRecovery = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleCloseModalAndMoveToPersonalAreaOnClick = useCallback(() => {
        dispatch(setAfterPasswordRecoveryModalOpen(false))
        navigate("/lk")
    }, [navigate, dispatch])

    const handleCloseModalAndMoveToHomepageOnClick = useCallback(() => {
        dispatch(setAfterPasswordRecoveryModalOpen(false))
        navigate("/")
    }, [navigate, dispatch])

    return (
        <div 
            className={styles.popupRecord}
            style={{paddingTop: "85px", paddingBottom: "84px"}}
        >
            <p style={{maxWidth: "595px"}} className={styles.title}>
                Пароль успешно восстановлен
            </p>
            <div className={styles.buttons}>
                <button 
                    onClick={handleCloseModalAndMoveToPersonalAreaOnClick} 
                    className={styles.blueButton}>
                        Личный кабинет
                </button>
                <button
                    onClick={handleCloseModalAndMoveToHomepageOnClick} 
                    className={styles.whiteButton}>
                        На главную
                </button>
            </div>
        </div>
    )
}

export const PopUpEmailAlreadyRegistered = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleMoveToLoginPageOnClick = useCallback(() => {
        dispatch(setEmailAlreadyRegisteredModalOpen(false))
        navigate("/login")
    }, [dispatch, navigate])

    const handleMoveToHomePageOnClick = useCallback(() => {
        dispatch(setEmailAlreadyRegisteredModalOpen(false))
        navigate("/")
    }, [dispatch, navigate])

    return (
        <div
            className={styles.popupRecord}
            style={{paddingTop: "85px", paddingBottom: "101px"}}
        >
            <p style={{maxWidth: "581px"}} className={styles.title}>
                Данный e-mail уже зарегистрирован перейдите к странице входа.
            </p>
            <div className={styles.buttons}>
                <button 
                    className={styles.blueButton}
                    style={{padding: "16px 56px"}}
                    onClick={handleMoveToLoginPageOnClick}>
                        Войти
                </button>
                <button
                    className={styles.whiteButton} 
                    style={{padding: "16px 32px"}}
                    onClick={handleMoveToHomePageOnClick}>
                        На главную
                </button>
            </div>
        </div>
    )
}

export const PopUpCookie = () => {
    const dispatch = useAppDispatch()

    const handleSetIsCookieOpenOnClick = useCallback(() => {
        dispatch(setCookieModalOpen(false))
    }, [dispatch])
    return (
        <div className={styles.popupCookieWrapper}>
            <img className={styles.popupCookieImage} src={CookieImage} alt="Cookie" />
            <div className={styles.popupCookieTextWrapper}>
                <p className={styles.popupCookieText}>
                    Мы используем cookie для сбора информации технического характера и обрабатываем IP-адрес вашего местоположения.
                    Продолжая использовать этот сайт, вы даете согласие на использование файлов cookies.
                </p>
            </div>
            <button
                className={styles.popupCookieButton}
                onClick={handleSetIsCookieOpenOnClick}
            >
                Принять&nbsp;cookie
            </button>
        </div>
    )
}