import React, { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { Asterisk } from "../widgets/Formicons/Asterisk"
import { QuestionEmail, QuestionPassword } from "../widgets/Formicons/Question/Question"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { loginThunk, selectShowAccountVerified } from "store/authSlice"
import { REQUIRED, WRONG_CREDENTIALS } from "../utils/constants"
import { NOT_AUTHENTICATED } from "store/constants/errors-constants"
import styles from "./LoginForm.module.scss"
import { isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import generalFormStyles from "../Forms.module.scss"
import { LoginFormMessage, LoginInputErrors, LoginInputState, LoginVisisted } from "../utils/types"
import { useLoginFormInitialState } from "../utils/hooks"


export const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const showAccountVerified = useAppSelector(selectShowAccountVerified)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const { initialInputState, initialVisited, initialInputErrors } = useLoginFormInitialState()

    const [inputState, setInputState] = useState<LoginInputState>(initialInputState)
    const [inputVisisted, setInputVisited] = useState<LoginVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<LoginInputErrors>(initialInputErrors)

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setInputState((prevInputState) => ({...prevInputState, [name]: value}))
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))        
        validateInputsAndSetInputErrors<LoginInputErrors>(name, value, setInputErrors)          

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
        setIsDisabled(isInputErrors(inputErrors))        
    }, [inputErrors])

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsDisabled(true)
        dispatch(loginThunk(inputState))
            .then((message: LoginFormMessage) => {
                if (!message) {
                    navigate("/lk")
                } else if (message === NOT_AUTHENTICATED) {
                    setInputVisited({ email: true, password: true })
                    setInputErrors({ email: WRONG_CREDENTIALS, password: WRONG_CREDENTIALS })
                } else {
                    navigate("/error")
                }
            })
            .catch((error) => {
                navigate("/error")                
            })
    }, [inputState, dispatch, navigate])
    
    return (
        <div className={`${styles.formWrapper} ${generalFormStyles.formWrapper}`}>
            { showAccountVerified ? (
                <p className={styles.successTitle}>
                        Ваша учетная запись подтверждена. Спасибо!
                </p> )
                : null
            }
            <form 
                className={`${styles.form} ${generalFormStyles.form}`}
                onSubmit={handleSubmitForm}
            >
                <fieldset className={`${styles.fieldset} ${generalFormStyles.fieldset}`}>
                    <legend className={generalFormStyles.legend}>Вход</legend> 
                    
                    <label className={generalFormStyles.label} htmlFor="email">
                        Email <Asterisk/>
                    </label>                        
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input
                            className={`input ${(inputVisisted.email && inputErrors.email) ? "input_error" 
                                : (inputVisisted.email && !inputErrors.email) ? "input_success" : ""}`}
                            required
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
                    
                    <div className={styles.inputBlock}>
                        <label className={generalFormStyles.label} htmlFor="password">
                            Пароль <Asterisk/>
                        </label>
                        <NavLink className={styles.forgetPassword} to="/forget_password">Забыли пароль</NavLink>
                    </div>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input 
                            className={`input ${(inputVisisted.password && inputErrors.password) ? "input_error" : 
                                (inputVisisted.password && !inputErrors.password) ? "input_success" : ""}`}
                            type="password"
                            required
                            placeholder="Пароль"
                            name="password"
                            value={inputState.password}   
                            onChange={handleInputOnChange}
                            onBlur={handleInputOnBlur}
                        />
                        <QuestionPassword/>
                    </div>
                    { (inputVisisted.password && inputErrors.password) && 
                        <div className="error-message">{inputErrors.password}</div>}

                    <div className={`${styles.buttons} ${generalFormStyles.buttons}`}>
                        <NavLink 
                            className={generalFormStyles.link} 
                            to="/"
                        >На главную
                        </NavLink>
                        <button 
                            className={isDisabled ? `${generalFormStyles.button} ${generalFormStyles.button_disabled}` : generalFormStyles.button}
                            type="submit"
                            disabled={isDisabled}
                        >
                            Войти
                        </button>                    
                    </div> 
                </fieldset>    
            </form>
            <div className={generalFormStyles.remark}>
                <span className={generalFormStyles.text}>Если вы не зарегистрированы, перейдите на страницу&nbsp;
                    <NavLink className={generalFormStyles.link} to="/registration">регистрации</NavLink>
                </span>
            </div>
        </div>
    )
}