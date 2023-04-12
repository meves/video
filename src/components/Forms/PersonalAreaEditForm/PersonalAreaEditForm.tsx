import React, { ChangeEvent, FocusEvent, FormEvent, useCallback, useEffect, useState } from "react"
import styles from "./PersonalAreaEditForm.module.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { EditPencil } from "components/common/SVG/EditPencil"
import { QuestionName } from "../widgets/Formicons/Question/Question"
import { isInputErrors, validateInputsAndSetInputErrors } from "../utils/utils"
import { useInputEditable, usePersonalAreaFormInitialState } from "../utils/hooks"
import { logoutThunk } from "store/authSlice"
import { selectUser, updateUserNameThunk } from "store/userSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import generalFormStyles from "../Forms.module.scss"
import { LogoutFormMessage, UpdateUserNameFormMessage, PersonalAreaInputErrors, PersonalAreaInputState, PersonalAreaVisisted } from "../utils/types"
import { BAD_REQUEST, NOT_CREDENTIALS, NOT_FOUND } from "store/constants/errors-constants"
import { setError_400 } from "store/errorSlice"
import { WRONG_FIRST_NAME, WRONG_LAST_NAME } from "../utils/constants"


export const PersonalAreaEditForm = ({
    setIsOpen
} : {
    setIsOpen: (isopen: boolean) => void
}) => {
    const user = useAppSelector(selectUser)
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [exitButtonDisabled, setExitButtonDisabled] = useState<boolean>(false)
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(false)

    const { initialInputState, initialVisited, initialInputErrors } = usePersonalAreaFormInitialState()

    const [inputState, setInputState] = useState<PersonalAreaInputState>(() => {
        if (user) return user
        else return initialInputState
    })
    const [inputVisisted, setInputVisited] = useState<PersonalAreaVisisted>(initialVisited)
    const [inputErrors, setInputErrors] = useState<PersonalAreaInputErrors>(initialInputErrors)

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setInputState(prevInputState => {
            if (name === "email") {
                return prevInputState
            }
            return {...prevInputState, [name]: value}
        })
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))
        validateInputsAndSetInputErrors<PersonalAreaInputErrors>(name, value, setInputErrors)       
    }, [])

    const handleInputOnBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value        
        const trimmedValue = value.trim()
        setInputState(prevInputState => ({...prevInputState, [name]: trimmedValue}))
        if (!trimmedValue) {
            setInputErrors(prevInputErrors => ({...prevInputErrors, [name]: ""}))                
        } else {
            validateInputsAndSetInputErrors<PersonalAreaInputErrors>(name, trimmedValue, setInputErrors)            
        }
        setInputVisited(prevInputVisited => ({...prevInputVisited, [name]: true}))       
    }, [])

    useEffect(() => {
        setIsDisabled(isInputErrors(inputErrors))
    }, [inputErrors])

    const handleDenyInputOnClick = useCallback(() => {
        if (user) {
            setInputState(user)
        }
    }, [user])

    const handleExitAccountOnClick = useCallback(async () => {
        setExitButtonDisabled(true)
        dispatch(logoutThunk())
            .then((message: LogoutFormMessage) => {
                if (!message) {
                    navigate("/")                
                } else if (message === BAD_REQUEST || message === NOT_CREDENTIALS) {
                    dispatch(setError_400(message))
                    navigate("/notfound")
                } else {
                    navigate("/error")     
                }
            })
            .catch((error) => {
                navigate("/error")                
            })
    }, [dispatch, navigate])

    const handleDeleteAccountOnClick = useCallback(() => {
        setDeleteButtonDisabled(true)
        setIsOpen(true)
        setDeleteButtonDisabled(false)
    }, [setIsOpen])

    const handleEditNameOnClick = useInputEditable()

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (user?.id) {
            setIsDisabled(true)            
            dispatch(updateUserNameThunk(user.id, { first_name: inputState.first_name, last_name: inputState.last_name }))
            .then((message: UpdateUserNameFormMessage) => {
                if (!message) {
                        event.currentTarget.children[0].children[2].children[0].setAttribute("disabled", "true")            
                        event.currentTarget.children[0].children[4].children[0].setAttribute("disabled", "true")
                        setInputVisited(prevInputVisited => ({...prevInputVisited, first_name: false, last_name: false}))
                        setInputErrors(prevInputErrors => ({...prevInputErrors, first_name: "", last_name: ""}))
                        setIsDisabled(false)                        
                    } else if (message === BAD_REQUEST) {
                        setInputVisited(prevInputVisited => ({...prevInputVisited, first_name: true, last_name: true}))
                        setInputErrors(prevInputErrors => ({
                            ...prevInputErrors, first_name: WRONG_FIRST_NAME, last_name: WRONG_LAST_NAME
                        }))      
                    } else if (message === NOT_CREDENTIALS || message === NOT_FOUND) {
                        dispatch(setError_400(message))
                        navigate("/notfound")
                    }  else {           
                        navigate("/error")
                    } 
                })
                .catch(error => {
                    navigate("/error")
                })
        }    
    }, [dispatch, navigate, inputState.first_name, inputState.last_name, user?.id])  

    return (
        <div className={`${styles.formWrapper} ${generalFormStyles.formWrapper}`}>
            <form 
                className={`${styles.form} ${generalFormStyles.form}`}
                onSubmit={handleSubmitForm}
            >
                <fieldset className={`${styles.fieldset} ${generalFormStyles.fieldset}`}>
                    <legend className={generalFormStyles.legend}>Личная информация</legend>
                    
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
                            disabled
                        />
                        <div onClick={handleEditNameOnClick}>
                            <EditPencil/>
                        </div>
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
                            disabled
                        />
                        <div onClick={handleEditNameOnClick}>
                            <EditPencil/>
                        </div>
                        <QuestionName/>
                    </div>
                    { (inputVisisted.last_name && inputErrors.last_name) &&
                        <div className="error-message">{inputErrors.last_name}</div>}
                    
                    <label className={generalFormStyles.label} htmlFor="email">Email</label>
                    <div className={`${styles.inputWrapper} ${generalFormStyles.inputWrapper}`}>
                        <input 
                            className={`input`}
                            type="email" 
                            placeholder="Электронная почта"
                            name="email"
                            value={inputState.email}
                            onChange={handleInputOnChange}
                            disabled
                        />
                    </div>
                    { (inputVisisted.email && inputErrors.email) &&
                        <div className="error-message">{inputErrors.email}</div>}                    
                    
                </fieldset>

                <div className={styles.text}>
                    <span>Пароль</span>
                    <NavLink className={styles.textLink} to="/change_password">Поменять пароль</NavLink>
                </div>

                <div className={`${styles.buttons} ${generalFormStyles.buttons}`}>
                    <div className={styles.buttonsRow}>
                        <button 
                            onClick={handleDenyInputOnClick}
                            className={`${styles.link} ${generalFormStyles.link}`}
                        >Отмена
                        </button>
                        <button 
                            // className={`form-button ${isDisabled ? "form-button_disabled" : "form-button_success"}`}
                            className={isDisabled ? `${generalFormStyles.button} ${generalFormStyles.button_disabled}` : generalFormStyles.button}
                            type="submit"
                            disabled={isDisabled}
                        >Сохранить
                        </button>
                    </div>
                    <div className={styles.buttonsRow}>
                        <button 
                            disabled={exitButtonDisabled}
                            onClick={handleExitAccountOnClick}
                            className={`${styles.link} ${generalFormStyles.link}`}>
                            Выйти
                        </button>
                        <button 
                            disabled={deleteButtonDisabled}
                            onClick={handleDeleteAccountOnClick}
                            className={`${styles.link} ${generalFormStyles.link}`}>
                            Удалить&nbsp;учетную&nbsp;запись
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}