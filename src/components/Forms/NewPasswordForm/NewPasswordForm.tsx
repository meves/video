import React, { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CheckPasswordMark } from "components/common/SVG/CheckMarks"
import { REQUIRED, WRONG_PASSWORD } from "../utils/constants"
import { PASSWORD_NOT_CONFIRMED } from "store/constants/errors-constants"
import { comparePasswords, isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import { QuestionPassword } from "../widgets/Formicons/Question/Question"
import styles from "./NewPasswordForm.module.scss"
import generalFormStyles from "../Forms.module.scss"
import { Asterisk } from "../widgets/Formicons/Asterisk"
import { confirmResetPasswordThunk } from "store/authSlice"
import { setAfterPasswordRecoveryModalOpen } from "store/modalSlice"
import { useAppDispatch } from "store/hooks"
import { ConfirmPasswordFormMessage, NewPasswordInputErrors, NewPasswordInputState, NewPasswordVisisted } from "../utils/types"
import { useNewPasswordFormInitialState } from "../utils/hooks"


export const NewPasswordForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(false)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const { initialInputState, initialVisited, initialInputErrors } = useNewPasswordFormInitialState()

    const [inputState, setInputState] = useState<NewPasswordInputState>(initialInputState)
    const [inputVisisted, setInputVisited] = useState<NewPasswordVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<NewPasswordInputErrors>(initialInputErrors)
    
    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setInputState(prevInputState => {
            if (name === "re_password") {
                setIsPasswordsMatch(comparePasswords(prevInputState.password, value))
            }
            if (name === "password") {
                setIsPasswordsMatch(comparePasswords(prevInputState.re_password, value))
            }
            return {...prevInputState, [name]: value}
        })
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))
        validateInputsAndSetInputErrors<NewPasswordInputErrors>(name, value, setInputErrors)     
        
        if (!value) {
            setInputErrors(prevInputErrors => ({...prevInputErrors, [name]: REQUIRED}))
        }

    }, [])

    const handleInputOnBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        if (!value) {
            setInputErrors(prevInputErrors => ({...prevInputErrors, [name]: REQUIRED}))
        }
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))       
    }, []) 

    useEffect(() => {
        setIsDisabled( !( isPasswordsMatch && !isInputErrors(inputErrors) ) )
    }, [inputErrors, isPasswordsMatch])

    useEffect(() => {
        setIsPasswordsMatch(comparePasswords(inputState.password, inputState.re_password))
    }, [inputState])

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsDisabled(true)
        dispatch(confirmResetPasswordThunk({ new_password: inputState.password, re_new_password: inputState.re_password }))
            .then((message: ConfirmPasswordFormMessage) => {
                if (!message) {
                    dispatch(setAfterPasswordRecoveryModalOpen(true))
                } else if (message === PASSWORD_NOT_CONFIRMED) {
                    setInputVisited({ password: true, re_password: true })
                    setInputErrors({ password: WRONG_PASSWORD, re_password: WRONG_PASSWORD })
                } else {
                    navigate("/error")                
                }
            })
            .catch((error) => {
                navigate("/error")                
            })
    }, [dispatch, navigate, inputState])    

    return (
        <div className={`${styles.formWrapper} ${generalFormStyles.formWrapper}`}>
            <form 
                className={`${styles.form} ${generalFormStyles.form}`}
                onSubmit={handleSubmitForm}
            >
                <fieldset className={`${styles.fieldset} ${generalFormStyles.fieldset}`}>
                    <legend className={generalFormStyles.legend}>Новый пароль</legend>
                    
                    <label className={generalFormStyles.label} htmlFor="password">
                        Новый пароль <Asterisk/>
                    </label>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input 
                            className={`input ${(inputVisisted.password && inputErrors.password) ? "input_error" 
                                : (inputVisisted.password && !inputErrors.password) ? "input_success" : ""}`}
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={inputState.password}   
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionPassword/>
                        <div className={`${styles.checkMark} check-mark ${isPasswordsMatch ? "check-mark_success" : ""}`}>
                            <CheckPasswordMark/>
                        </div>
                    </div>
                    { (inputVisisted.password && inputErrors.password) &&
                        <div className="error-message">{inputErrors.password}</div>}
                    
                    <label className={generalFormStyles.label} htmlFor="re_password">
                        Подтвердить новый пароль <Asterisk/>
                    </label>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper} ${styles.last}`}>
                        <input 
                            className={`input ${(inputVisisted.re_password && inputErrors.re_password) ? "input_error" 
                                : (inputVisisted.re_password && !inputErrors.re_password) ? "input_success" : ""}`}
                            type="password"
                            placeholder="Подтвердите пароль"
                            name="re_password"
                            value={inputState.re_password}
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionPassword/>
                        <div className={`${styles.checkMark} check-mark ${isPasswordsMatch ? "check-mark_success" : ""}`}>
                            <CheckPasswordMark/>
                        </div>
                    </div>
                    { (inputVisisted.re_password && inputErrors.re_password) &&
                        <div className="error-message">{inputErrors.re_password}</div>}
                                        
                </fieldset>    
                <div className={`${styles.buttons} ${generalFormStyles.buttons}`}>
                    <button 
                        // className={`form-button ${isDisabled ? "form-button_disabled" : "form-button_success"}`}
                        className={isDisabled ? `${generalFormStyles.button} ${generalFormStyles.button_disabled}` : generalFormStyles.button}
                        type="submit"
                        disabled={isDisabled}
                    >Сохранить
                    </button>
                    <NavLink className={`${styles.link} ${generalFormStyles.link}`} to="/">На&nbsp;главную</NavLink>
                </div>
            </form>
        </div>
    )
}