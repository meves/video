import React, { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useState } from "react"
import styles from "./RegistrationForm.module.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { Asterisk } from "../widgets/Formicons/Asterisk"
import { QuestionEmail, QuestionName, QuestionPassword } from "../widgets/Formicons/Question/Question"
import { CheckPasswordMark } from "components/common/SVG/CheckMarks"
import { useAppDispatch } from "store/hooks"
import { registerThunk } from "store/authSlice"
import { REQUIRED } from "../utils/constants"
import { USER_EXISTS } from "store/constants/errors-constants"
import { comparePasswords, isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import { useCheckbox, useRegistrationFormInitialState } from "../utils/hooks"
import generalFormStyles from "../Forms.module.scss"
import { RegistrationFormMessage, RegistrationInputErrors, RegistrationInputState, RegistrationVisisted } from "../utils/types"
import { setEmailAlreadyRegisteredModalOpen } from "store/modalSlice"


export const RegistrationForm = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    
    const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(false)

    const {isChecked, handleCheckedOnChange} = useCheckbox()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const { initialInputState, initialVisited, initialInputErrors } = useRegistrationFormInitialState()

    const [inputState, setInputState] = useState<RegistrationInputState>(initialInputState)
    const [inputVisisted, setInputVisited] = useState<RegistrationVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<RegistrationInputErrors>(initialInputErrors)
    
    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setInputState((prevInputState: RegistrationInputState) => {
            if (name === "re_password") {
                setIsPasswordsMatch(comparePasswords(prevInputState.password, value))
            }
            if (name === "password") {
                setIsPasswordsMatch(comparePasswords(prevInputState.re_password, value))
            }
            return {...prevInputState, [name]: value}
        })
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))
        validateInputsAndSetInputErrors<RegistrationInputErrors>(name, value, setInputErrors)  
        
        if (!value && name !== "first_name" && name !== "last_name") {
            setInputErrors(prevInputErrors => ({...prevInputErrors, [name]: REQUIRED}))
        }
        
    }, [])

    const handleInputOnBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name
        let value = event.currentTarget.value
        if (!value && name !== "first_name" && name !== "last_name") {
            setInputErrors(prevInputErrors => ({...prevInputErrors, [name]: REQUIRED}))
        }
        if (name === "first_name" || name === "last_name") {
            let trimmedValue = value.trim()
            setInputState(prevInputState => ({...prevInputState, [name]: trimmedValue}))
            if (!trimmedValue) {
                setInputErrors(prevInputErrors => ({...prevInputErrors, [name]: ""}))             
            } else {
                validateInputsAndSetInputErrors<RegistrationInputErrors>(name, trimmedValue, setInputErrors)              
            }        
        }
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))       
    }, [])        

    useEffect(() => {
        setIsDisabled( !( isChecked && isPasswordsMatch && !isInputErrors(inputErrors) ) ) 
    }, [inputErrors, isChecked, isPasswordsMatch])

    useEffect(() => {
        setIsPasswordsMatch(comparePasswords(inputState.password, inputState.re_password))
    }, [inputState.password, inputState.re_password])

    const handleSubmitForm = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsDisabled(true)
        dispatch(registerThunk(inputState))
            .then((errorMessage: RegistrationFormMessage) => {                
                if (!errorMessage) {
                    navigate("/thank")          
                } else if (errorMessage === USER_EXISTS) {
                    dispatch(setEmailAlreadyRegisteredModalOpen(true))
                } else {
                    navigate("/error")
                }
            })
            .catch((error) => {
                navigate("/error")
            })
    }, [dispatch, inputState, navigate]) 

    return (
        <div className={`${styles.formWrapper} ${generalFormStyles.formWrapper}`}>
            <form 
                className={`${styles.form} ${generalFormStyles.form}`}
                onSubmit={handleSubmitForm}
                >
                <fieldset className={`${styles.fieldset} ${generalFormStyles.fieldset}`}>
                    <legend className={generalFormStyles.legend}>Регистрация</legend>
                    
                    <label className={generalFormStyles.label} htmlFor="first_name">Имя</label>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input 
                            className={`input ${(inputVisisted.first_name && inputErrors.first_name) ? "input_error" 
                                : (inputVisisted.first_name && !inputErrors.first_name) ? "input_success" : ""}`}
                            type="text" 
                            placeholder="Имя"
                            name="first_name"
                            value={inputState.first_name}
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionName/>
                    </div>
                    { (inputVisisted.first_name && inputErrors.first_name) &&
                        <div className="error-message">{inputErrors.first_name}</div>}
                    
                    <label className={generalFormStyles.label} htmlFor="last_name">Фамилия</label>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input 
                            className={`input ${(inputVisisted.last_name && inputErrors.last_name) ? "input_error" 
                                : (inputVisisted.last_name && !inputErrors.last_name) ? "input_success" : ""}`}
                            type="text" 
                            placeholder="Фамилия" 
                            name="last_name"
                            value={inputState.last_name}
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionName/>
                    </div>
                    { (inputVisisted.last_name && inputErrors.last_name) &&
                        <div className="error-message">{inputErrors.last_name}</div>}
                    
                    <label className={generalFormStyles.label} htmlFor="email">
                        Email <Asterisk/>
                    </label>                        
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input
                            className={`input ${(inputVisisted.email && inputErrors.email) ? "input_error" 
                                : (inputVisisted.email && !inputErrors.email) ? "input_success" : ""}`}
                            placeholder="Электронная почта"
                            name="email"
                            value={inputState.email}
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionEmail/>
                    </div>
                    { (inputVisisted.email && inputErrors.email) &&
                        <div className="error-message">{inputErrors.email}</div>}
                    
                    <label className={generalFormStyles.label} htmlFor="password">
                        Пароль <Asterisk/>
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
                        <div className={`check-mark ${isPasswordsMatch ? "check-mark_success" : ""}`}>
                            <CheckPasswordMark/>
                        </div>
                        <QuestionPassword/>
                    </div>
                    { (inputVisisted.password && inputErrors.password) &&
                        <div className="error-message">{inputErrors.password}</div>}
                    
                    <label className={generalFormStyles.label} htmlFor="re_password">
                        Подтвердите пароль <Asterisk/>
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
                        <div className={`check-mark ${isPasswordsMatch ? "check-mark_success" : ""}`}>
                            <CheckPasswordMark/>
                        </div>
                        <QuestionPassword/>
                    </div>
                    { (inputVisisted.re_password && inputErrors.re_password) &&
                        <div className="error-message">{inputErrors.re_password}</div>}
                    
                    <div className={styles.checkboxWrapper}>
                        <input 
                            className={styles.checkbox}
                            type="checkbox"
                            name="acquainted"
                            checked={isChecked}
                            onChange={handleCheckedOnChange}
                        />
                        <label className={styles.checkboxLabel} htmlFor="acquainted">
                            <span className={styles.text}>Я ознакомился с </span>
                            <NavLink className={styles.link} to="/terms">Пользовательским соглашением</NavLink>
                            <span className={styles.text}> и </span>
                            <NavLink className={styles.link} to="/privacy">Политикой конфиденциальности</NavLink>
                        </label>
                    </div>
                    <div className={`${styles.buttons} ${generalFormStyles.buttons}`}>
                        <NavLink 
                            className={generalFormStyles.link} 
                            to="/"
                        >
                            На&nbsp;главную
                        </NavLink>
                        <button 
                            className={isDisabled ? `${generalFormStyles.button} ${generalFormStyles.button_disabled}` : generalFormStyles.button}
                            type="submit"
                            disabled={isDisabled}
                        >Зарегистрироваться
                        </button>
                    </div>
                </fieldset>    
            </form>
            <div className={generalFormStyles.remark}>
                <span className={generalFormStyles.text}>Если вы уже зарегистрированы, перейдите на страницу&nbsp;
                    <NavLink className={generalFormStyles.link} to="/login">входа</NavLink>
                </span>
            </div>
        </div>
    )
}