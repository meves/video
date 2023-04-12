import { HAS_TO_LOGIN, NOT_ACTIVATED } from './../../../store/constants/errors-constants';
import { Dispatch, SetStateAction } from "react"
import { BAD_REQUEST, NOT_AUTHENTICATED, NOT_CREDENTIALS, NOT_FOUND, PASSWORD_NOT_CONFIRMED, USER_EXISTS } from "store/constants/errors-constants"


export type CommoonInputState = {
    first_name: string
    last_name: string
    email: string
    old_password: string
    password: string
    re_password: string
}

export type CommoonVisited = {
    first_name: boolean
    last_name: boolean
    email: boolean
    old_password: boolean
    password: boolean
    re_password: boolean
}

export type CommoonInputErrors = CommoonInputState

type RegistrationStates = "first_name" | "last_name" | "email" | "password" | "re_password"
export type RegistrationInputState = Pick<CommoonInputState, RegistrationStates>
export type RegistrationInputErrors = Pick<CommoonInputErrors, RegistrationStates>
export type RegistrationVisisted = Pick<CommoonVisited, RegistrationStates>

type LoginStates = "email" | "password"
export type LoginInputState = Pick<CommoonInputState, LoginStates>
export type LoginInputErrors = Pick<CommoonInputErrors, LoginStates>
export type LoginVisisted = Pick<CommoonVisited, LoginStates>

type ChangePasswordStates = "old_password" | "password" | "re_password"
export type ChangePasswordInputState = Pick<CommoonInputState, ChangePasswordStates> 
export type ChangePasswordVisisted = Pick<CommoonVisited, ChangePasswordStates>
export type ChangePasswordInputErrors = Pick<CommoonInputErrors, ChangePasswordStates>

type ForgetPasswordStates = "email"
export type ForgetPasswordInputState = Pick<CommoonInputState, ForgetPasswordStates>
export type ForgetPasswordVisisted = Pick<CommoonVisited, ForgetPasswordStates>
export type ForgetPasswordInputErrors = Pick<CommoonInputErrors, ForgetPasswordStates>

type NewPasswordStates = "password" | "re_password"
export type NewPasswordInputState = Pick<CommoonInputState, NewPasswordStates>
export type NewPasswordInputErrors = Pick<CommoonInputErrors, NewPasswordStates>
export type NewPasswordVisisted = Pick<CommoonVisited, NewPasswordStates>

type PersonalAreaStates = "first_name" | "last_name" | "email" 
export type PersonalAreaInputState = Pick<CommoonInputState, PersonalAreaStates>
export type PersonalAreaInputErrors = Pick<CommoonInputErrors, PersonalAreaStates>
export type PersonalAreaVisisted = Pick<CommoonVisited, PersonalAreaStates>

type SubmitEmailPasswordStates = "email"
export type SubmitEmailInputState = Pick<CommoonInputState, SubmitEmailPasswordStates>
export type SubmitEmailInputErrors = Pick<CommoonInputErrors, SubmitEmailPasswordStates>
export type SubmitEmailVisited = Pick<CommoonVisited, SubmitEmailPasswordStates>


export type CommentInputState = {
    comment?: string
}
export type CommentVisisted = {
    comment: boolean
}
export type CommentInputErrors = {
    comment: string
}


export type SetInputErrors<T> = 
    T extends ChangePasswordInputErrors ? Dispatch<SetStateAction<ChangePasswordInputErrors>>
    : T extends RegistrationInputErrors ? Dispatch<SetStateAction<RegistrationInputErrors>>
    : T extends LoginInputErrors ? Dispatch<SetStateAction<LoginInputErrors>>
    : T extends PersonalAreaInputErrors ? Dispatch<SetStateAction<PersonalAreaInputErrors>>
    : T extends NewPasswordInputErrors ? Dispatch<SetStateAction<NewPasswordInputErrors>>
    : T extends ForgetPasswordInputErrors ? Dispatch<SetStateAction<ForgetPasswordInputErrors>>
    : T extends SubmitEmailInputErrors ? Dispatch<SetStateAction<SubmitEmailInputErrors>>
    : T extends CommentInputErrors ? Dispatch<SetStateAction<CommentInputErrors>>
    : never;

export type UpdateUserNameFormMessage = typeof BAD_REQUEST | typeof NOT_CREDENTIALS | typeof NOT_FOUND | undefined
export type ChangePasswordFormMessage = typeof BAD_REQUEST | typeof PASSWORD_NOT_CONFIRMED | typeof HAS_TO_LOGIN | undefined
export type ForgetPasswordFormMessage = typeof BAD_REQUEST | typeof NOT_ACTIVATED | undefined
export type ConfirmPasswordFormMessage = typeof PASSWORD_NOT_CONFIRMED | undefined
export type RegistrationFormMessage = typeof USER_EXISTS | undefined
export type SubmitEmailFormMessage = typeof BAD_REQUEST | typeof NOT_CREDENTIALS | typeof NOT_FOUND | undefined
export type LogoutFormMessage = typeof BAD_REQUEST | typeof NOT_CREDENTIALS | undefined
export type LoginFormMessage = typeof NOT_AUTHENTICATED | undefined
