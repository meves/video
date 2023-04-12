import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react"
import { REQUIRED } from "./constants"


export const useCheckbox = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const handleCheckedOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked((prevIsChecked: boolean) => !prevIsChecked)
    }, [])

    return { isChecked, handleCheckedOnChange }
}

export const useInputEditable = () => {
    const makeInputEditable = useCallback((textarea: HTMLTextAreaElement) => {
        textarea.disabled = false
        textarea.focus()
    }, [])
    
    const handleEditNameOnClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const textarea: Element | null = event.currentTarget.previousElementSibling
        if (textarea) {
            makeInputEditable(textarea as HTMLTextAreaElement)
        }
    }, [makeInputEditable])

    return handleEditNameOnClick
}

export const useRegistrationFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: ""
    }), [])

    const initialVisited = useMemo(() => ({
        first_name: false,
        last_name: false,
        email: false,
        password: false,
        re_password: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        first_name: "",
        last_name: "",
        email: REQUIRED,
        password: REQUIRED,
        re_password: REQUIRED
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const useLoginFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        email: "",
        password: ""
    }), [])

    const initialVisited = useMemo(() => ({
        email: false,
        password: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        email: REQUIRED,
        password: REQUIRED
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const useChangePasswordFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        old_password: "",
        password: "",
        re_password: ""
    }), [])

    const initialVisited = useMemo(() => ({
        old_password: false,
        password: false,
        re_password: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        old_password: REQUIRED,
        password: REQUIRED,
        re_password: REQUIRED
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const useForgetPasswordFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        email: ""
    }), [])

    const initialVisited = useMemo(() => ({
        email: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        email: REQUIRED
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const useNewPasswordFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        password: "",
        re_password: ""
    }), [])

    const initialVisited = useMemo(() => ({
        password: false,
        re_password: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        password: REQUIRED,
        re_password: REQUIRED
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const usePersonalAreaFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        first_name: "",
        last_name: "",
        email: ""
    }), [])

    const initialVisited = useMemo(() => ({
        first_name: false,
        last_name: false,
        email: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        first_name: "",
        last_name: "",
        email: ""
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const useSubmitEmailFormInitialState = () => {
    const initialInputState = useMemo(() => ({
        email: ""
    }), [])

    const initialVisited = useMemo(() => ({
        email: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        email: REQUIRED
    }), [])

    return { initialInputState, initialVisited, initialInputErrors } 
}

export const useCommentInitialState = () => {
    const initialVisited = useMemo(() => ({
        comment: false
    }), [])

    const initialInputErrors = useMemo(() => ({
        comment: ""
    }), [])

    return { initialVisited, initialInputErrors } 
}