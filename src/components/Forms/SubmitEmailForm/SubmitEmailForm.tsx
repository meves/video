import React, { ChangeEvent, FC, FocusEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { REQUIRED, WRONG_EMAIL } from "../utils/constants"
import { BAD_REQUEST, NOT_CREDENTIALS, NOT_FOUND } from "store/constants/errors-constants"
import { QuestionEmail } from "../widgets/Formicons/Question/Question"
import { isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import styles from "./SubmitEmailForm.module.scss"
import buttonsStyle from "components/common/Modal/Content/Content.module.scss"
import { deleteUserAccountThunk, selectUser } from "store/userSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { Asterisk } from "../widgets/Formicons/Asterisk"
import generalFormStyles from "../Forms.module.scss"
import { SubmitEmailFormMessage, SubmitEmailInputErrors, SubmitEmailInputState, SubmitEmailVisited } from "../utils/types"
import { setError_400 } from "store/errorSlice"
import { useSubmitEmailFormInitialState } from "../utils/hooks"


type SubmitEmailFormType = {
    handleCancelOnClick: () => void
}
export const SubmitEmailForm: FC<SubmitEmailFormType> = ({ handleCancelOnClick }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const userId = useAppSelector(selectUser)?.id as number
    
    const [isDisabled, setIsDisabled] = useState<boolean>(true)    
    
    const { initialInputState, initialVisited, initialInputErrors } = useSubmitEmailFormInitialState()

    const [inputState, setInputState] = useState<SubmitEmailInputState>(initialInputState)
    const [inputVisisted, setInputVisited] = useState<SubmitEmailVisited>(initialVisited)
    const [inputErrors, setInputErrors] = useState<SubmitEmailInputErrors>(initialInputErrors)

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setInputState(prevInputState => ({...prevInputState, [name]: value}))
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))
        validateInputsAndSetInputErrors<SubmitEmailInputErrors>(name, value, setInputErrors)
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
    }, [inputErrors, setIsDisabled])

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsDisabled(true)
        dispatch(deleteUserAccountThunk(userId))
            .then((message: SubmitEmailFormMessage) => {
                if (!message) {
                    navigate("/removed")      
                } else if (message === BAD_REQUEST) {
                    setInputVisited({ email: true })
                    setInputErrors({ email: WRONG_EMAIL })
                } else if (message === NOT_CREDENTIALS || message === NOT_FOUND) {
                    dispatch(setError_400(message))
                    navigate("/notfound")
                } else {           
                    navigate("/error")
                }         
            })
            .catch((error) => {
                navigate("/error")
            })
    }, [dispatch, navigate, userId]) 

    return (
        <div className={styles.formWrapper}>
            <form 
                className={styles.form}
                onSubmit={handleSubmitForm}
            >
                <fieldset className={styles.fieldset}>
                    <label className={generalFormStyles.label} htmlFor="email">
                        Email <Asterisk/>
                    </label>                        
                    <div className={styles.inputWrapper}>
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
                <div className={buttonsStyle.buttons}>
                    <button 
                        style={{padding: "16px 56px"}}
                        className={buttonsStyle.blueButton}
                        onClick={handleCancelOnClick}>
                            Отмена
                    </button>
                    <button
                        style={{padding: "16px 56px"}}
                        className={`${buttonsStyle.whiteButton} ${isDisabled ? buttonsStyle.disabled : ""}`}
                        type="submit"
                        disabled={isDisabled}>
                            Подтвердить
                    </button>
                </div>    
            </form>
        </div>
    )
}