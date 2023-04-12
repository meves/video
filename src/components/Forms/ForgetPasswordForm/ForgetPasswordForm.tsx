import React, { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { REQUIRED, WRONG_EMAIL } from "../utils/constants"
import { BAD_REQUEST, NOT_ACTIVATED } from "store/constants/errors-constants"
import { QuestionEmail } from "../widgets/Formicons/Question/Question"
import { isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import styles from "./ForgetPasswordForm.module.scss"
import generalFormStyles from "../Forms.module.scss"
import { Asterisk } from "../widgets/Formicons/Asterisk"
import { useAppDispatch } from "store/hooks"
import { forgetPasswordThunk } from "store/authSlice"
import { setPasswordResetModalOpen } from "store/modalSlice"
import { ForgetPasswordFormMessage, ForgetPasswordInputErrors, ForgetPasswordInputState, ForgetPasswordVisisted } from "../utils/types"
import { useNavigate } from "react-router-dom"
import { setError_400 } from "store/errorSlice"
import { useForgetPasswordFormInitialState } from "../utils/hooks"
import { getFromLocalStorage } from "store/utils"
import { ResetPassword } from "store/types"
import { RESET_PASSWORD } from "store/constants/local-storage-constants"


export const ForgetPasswordForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLetterSentToEmail = useMemo(() => {
        const resetPassword = getFromLocalStorage<ResetPassword>(RESET_PASSWORD)
        return Boolean(resetPassword) ? true : false
    }, [])

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    
    const { initialInputState, initialVisited, initialInputErrors } = useForgetPasswordFormInitialState()

    const [inputState, setInputState] = useState<ForgetPasswordInputState>(initialInputState)
    const [inputVisisted, setInputVisited] = useState<ForgetPasswordVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<ForgetPasswordInputErrors>(initialInputErrors)
    
    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setInputState(prevInputState => ({...prevInputState, [name]: value}))
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))
        validateInputsAndSetInputErrors<ForgetPasswordInputErrors>(name, value, setInputErrors)

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
        dispatch(forgetPasswordThunk(inputState.email))
            .then((message: ForgetPasswordFormMessage) => {
                if (!message) {
                    dispatch(setPasswordResetModalOpen(true))
                } else if (message === BAD_REQUEST) {
                    setInputVisited({ email: true })
                    setInputErrors({ email: WRONG_EMAIL })
                } else if (message === NOT_ACTIVATED) {
                    dispatch(setError_400(message))
                    navigate("/notfound")
                } else {
                    navigate("/error")
                }
            })
            .catch((error) => {
                navigate("/error")                
            })
    }, [dispatch, navigate, inputState.email])    

    return (
        <div className={`${styles.formWrapper} ${generalFormStyles.formWrapper}`}>
            { isLetterSentToEmail ? (
                <p className={styles.successTitle}>
                        Письмо отправлено на почту!
                </p> )
                : null
            }
            <form 
                className={`${styles.form} ${generalFormStyles.form}`}
                onSubmit={handleSubmitForm}
            >
                <fieldset className={`${styles.fieldset} ${generalFormStyles.fieldset}`}>
                    <legend className={generalFormStyles.legend}>Забыли пароль</legend>
                    
                    <label className={generalFormStyles.label} htmlFor="email">
                        Введите свой email <Asterisk/>
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
                    
                </fieldset>    
                <div className={generalFormStyles.buttons}>
                    <button 
                        // className={`form-button ${isDisabled ? "form-button_disabled" : "form-button_success"}`}
                        className={isDisabled ? `${generalFormStyles.button} ${generalFormStyles.button_disabled}` : generalFormStyles.button}
                        type="submit"
                        disabled={isDisabled}
                    >Восстановить пароль</button>
                </div>
            </form>
        </div>
    )
}