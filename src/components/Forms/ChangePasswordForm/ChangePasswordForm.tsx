import React, { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { CheckPasswordMark } from "components/common/SVG/CheckMarks"
import { REQUIRED, WRONG_PASSWORD } from "../utils/constants"
import { BAD_REQUEST, HAS_TO_LOGIN, PASSWORD_NOT_CONFIRMED } from "store/constants/errors-constants"
import { comparePasswords, isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import { QuestionPassword } from "../widgets/Formicons/Question/Question"
import { Asterisk } from "../widgets/Formicons/Asterisk"
import { changePasswordThunk } from "store/authSlice"
import { useAppDispatch } from "store/hooks"
import { ChangePasswordFormMessage, ChangePasswordInputErrors, ChangePasswordInputState, ChangePasswordVisisted } from "../utils/types"
import { setError_400 } from "store/errorSlice"
import { useChangePasswordFormInitialState } from "../utils/hooks"
import generalFormStyles from "../Forms.module.scss"
import styles from "./ChangePasswordForm.module.scss"

export const ChangePasswordForm = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(false)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    
    const { initialInputState, initialInputErrors, initialVisited } = useChangePasswordFormInitialState()

    const [inputState, setInputState] = useState<ChangePasswordInputState>(initialInputState)
    const [inputVisisted, setInputVisited] = useState<ChangePasswordVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<ChangePasswordInputErrors>(initialInputErrors)
    
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
        validateInputsAndSetInputErrors<ChangePasswordInputErrors>(name, value, setInputErrors)

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
    }, [inputErrors, isPasswordsMatch, inputState])

    useEffect(() => {
        setIsPasswordsMatch(comparePasswords(inputState.password, inputState.re_password))
    }, [inputState])    

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsDisabled(true)
        dispatch(changePasswordThunk({
            current_password: inputState.old_password,
            new_password: inputState.password,
            re_new_password: inputState.re_password
        }))
            .then((message: ChangePasswordFormMessage) => {
                if (!message) {
                    navigate("/lk")            
                } else if (message === BAD_REQUEST) {
                    setInputVisited({ old_password: true, password: true, re_password: true })
                    setInputErrors({ old_password: WRONG_PASSWORD, password: WRONG_PASSWORD, re_password: WRONG_PASSWORD })
                } else if (message === PASSWORD_NOT_CONFIRMED) {
                    dispatch(setError_400(message))
                    navigate("/notfound")
                }  
                else if (message === HAS_TO_LOGIN) {
                    navigate("/login")
                }
                else {
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
                    <legend className={generalFormStyles.legend}>Смена пароля</legend>
                    
                    <label className={generalFormStyles.label} htmlFor="old_password">
                        Старый пароль <Asterisk/>
                    </label>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input 
                            className={`input ${(inputVisisted.old_password && inputErrors.old_password) ? "input_error" 
                                : (inputVisisted.old_password && !inputErrors.old_password) ? "input_success" : ""}`}
                            type="password"
                            placeholder="Пароль"
                            name="old_password"
                            value={inputState.old_password}   
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionPassword/>
                    </div>
                    { (inputVisisted.old_password && inputErrors.old_password) &&
                        <div className="error-message">{inputErrors.old_password}</div>}
                    
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
                        Подтвердите новый пароль <Asterisk/>
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

                    <div className={generalFormStyles.buttons}>
                        <NavLink 
                            // className={`${styles.link} ${generalFormStyles.link}`} 
                            className={`${generalFormStyles.link}`}
                            to="/lk"
                        >Отмена
                        </NavLink>
                        <button 
                            // className={`form-button ${isDisabled ? "form-button_disabled" : "form-button_success"}`}
                            className={isDisabled ? `${generalFormStyles.button} ${generalFormStyles.button_disabled}` : generalFormStyles.button}
                            type="submit"
                            disabled={isDisabled}
                        >Сохранить
                        </button>
                    </div>
                </fieldset>    
            </form>
        </div>
    )
}