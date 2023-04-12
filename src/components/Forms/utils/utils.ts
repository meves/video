import { WRONG_COMMENT, WRONG_CREDENTIALS, WRONG_FIRST_NAME, WRONG_LAST_NAME } from "./constants"
import { validateComment, validateEmail, validateName, validatePassowrd } from "./validators"
import { SetInputErrors } from "./types"


export const comparePasswords = (password: string, re_password: string): boolean => {
    if (Boolean(password) && Boolean(re_password)) {
        return password === re_password
    }
    return false
}

type InputErrors = {
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    re_password?: string
    old_password?: string
    comment?: string
}

export const isInputErrors = (inputErrors: InputErrors) => {
    return  Boolean(inputErrors.first_name) ||
            Boolean(inputErrors.last_name) ||
            Boolean(inputErrors.email) ||
            Boolean(inputErrors.password) ||
            Boolean(inputErrors.re_password) ||
            Boolean(inputErrors.old_password) ||
            Boolean(inputErrors.comment)
}

export function validateInputsAndSetInputErrors<T>(
    name: string, 
    value: string, 
    setInputErrors: SetInputErrors<T>
) {
    if (!value) {
        setInputErrors((prevInputErrors: any) => ({...prevInputErrors, [name]: ""}))           
    } else {
        switch (name) {
            case "first_name":
                validateName(value)
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""}))
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_FIRST_NAME}))
            break
            case "last_name":
                validateName(value)
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""})) 
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_LAST_NAME}))
            break
            case "email":
                validateEmail(value)
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""})) 
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_CREDENTIALS}))                 
            break
            case "password":
                validatePassowrd(value) && value 
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""})) 
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_CREDENTIALS}))             
            break
            case "re_password":
                validatePassowrd(value) && value
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""})) 
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_CREDENTIALS}))             
            break
            case "old_password":
                validatePassowrd(value) && value
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""})) 
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_CREDENTIALS}))             
            break  
            case "comment":
                validateComment(value) && value
                ? setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: ""}))
                : setInputErrors((prevRequiredErrors: any) => ({...prevRequiredErrors, [name]: WRONG_COMMENT}))      
        }
    }
}


