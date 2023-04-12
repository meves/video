import React from "react"
import { createPortal } from "react-dom"
import { PopUpWrapper, StubWrapper } from "./Wrapper"
import { 
    PopUpAfterFirstVideo,
    PopUpAfterPasswordRecovery, 
    PopUpAfterSecondVideo, 
    PopUpAfterThirdVideo, 
    PopUpCookie, 
    PopUpEmailAlreadyRegistered, 
    PopUpPasswordReset, 
    PopUpRecord, 
    PopUpSubmitEmail, 
    PopUpSubmitRemove, 
    Stub } from "./Content/Content"
import { useModal, usePopup } from "./hooks"
import { useAppSelector } from "store/hooks"
import { selectAfterFirstVideoModalOpen, selectAfterSecondVideoModalOpen, selectAfterThirdVideoModalOpen, selectCookieModalOpen, selectRecordModalOpen, selectVideoNotSentModalOpen } from "store/modalSlice"


export const StubModal = () => {
    const {setIsOpen, domElement} = useModal()

    return (
        createPortal(
            <StubWrapper>
                <Stub setIsOpen={setIsOpen}/>
            </StubWrapper>,
            domElement
        )
    )
}

export const RecordModal = () => {
    const recordModalOpen = useAppSelector(selectRecordModalOpen)
    const {domElement} = usePopup(recordModalOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpRecord/>
            </PopUpWrapper>,
            domElement
        )
    )
}

export const AfterFirstVideoModal = () => {
    const afterFirstVideoModalOpen = useAppSelector(selectAfterFirstVideoModalOpen)
    const { domElement } = usePopup(afterFirstVideoModalOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpAfterFirstVideo/>
            </PopUpWrapper>,
            domElement
        )
    )
}

export const AfterSecondVideoModal = () => {
    const afterSecondVideoModalOpen = useAppSelector(selectAfterSecondVideoModalOpen)
    const { domElement } = usePopup(afterSecondVideoModalOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpAfterSecondVideo/>
            </PopUpWrapper>,
            domElement
        )
    )
}

export const AfterThirdVideoModal = () => {
    const afterThirdVideoModalOpen = useAppSelector(selectAfterThirdVideoModalOpen)
    const { domElement } = usePopup(afterThirdVideoModalOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpAfterThirdVideo/>
            </PopUpWrapper>,
            domElement
        )
    )
}

export const VideoNotSentModal = () => {
    const videoNotSentModalOpen = useAppSelector(selectVideoNotSentModalOpen)
    const { domElement } = usePopup(videoNotSentModalOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpAfterThirdVideo/>
            </PopUpWrapper>,
            domElement
        )
    )
}

// предупреждение об удалении учетной записи
export const SubmitRemoveModal = ({
    isOpen,
    setIsOpen,
    setIsFormOpen
} : {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    setIsFormOpen: (isFormOpen: boolean) => void
}) => {
    const { domElement } = usePopup(isOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpSubmitRemove setIsOpen={setIsOpen} setIsFormOpen={setIsFormOpen} />
            </PopUpWrapper>,
            domElement
        )
    )
}
// подтверждение удаления учетной записи
export const SubmitEmailModal = ({
    isFormOpen,
    setIsFormOpen
} : {
    isFormOpen: boolean
    setIsFormOpen: (isFormOpen: boolean) => void
}) => {
    const {domElement} = usePopup(isFormOpen)
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpSubmitEmail setIsOpen={setIsFormOpen}/>
            </PopUpWrapper>,
            domElement
        )
    )
}

// Письмо для восстановления пароля отправлено на почту
export const PasswordResetModal = () => {
    const { domElement } = useModal()
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpPasswordReset/>
            </PopUpWrapper>,
            domElement
        )
    )
}

// Попап после успешного восстановления пароля:
export const AfterPasswordRecoveryModal = () => {
    const { domElement } = useModal()
    
    return (
        createPortal(
            <PopUpWrapper>
                <PopUpAfterPasswordRecovery />
            </PopUpWrapper>,
            domElement
        )
    )
}

// email уже зарешистрирован, редирект на страницу входа
export const EmailAlreadyRegisteredModal = () => {
    const { domElement } = useModal()

    return (
        createPortal(
            <PopUpWrapper>
                <PopUpEmailAlreadyRegistered/>
            </PopUpWrapper>,
            domElement
        )
    )
}

export const CookiePopUp = () => {
    const cookieModalOpen = useAppSelector(selectCookieModalOpen)
    const { domElement } = usePopup(cookieModalOpen)

    if (!cookieModalOpen) {
        return null
    }

    return (
        createPortal(
            <PopUpCookie/>,
            domElement
        )
    )
}