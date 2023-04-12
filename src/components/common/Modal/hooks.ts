import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useModal = () => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(true)    

    const ModalRootElement = useMemo(() => document.querySelector("#modal"), [])
    const domElement = useMemo(() => document.createElement("div"), [])

    useEffect(() => {
        if (isOpen) {
            ModalRootElement?.appendChild(domElement)
            return () => {
                ModalRootElement?.removeChild(domElement)
            }
        }
        if (!isOpen) {
            navigate("/")
        }
    }, [isOpen, domElement, ModalRootElement, navigate])

    return {setIsOpen, domElement}
}

export const usePopup = (isOpen: boolean) => {
    const ModalRootElement = useMemo(() => document.querySelector("#modal"), [])
    const domElement = useMemo(() => document.createElement("div"), [])
    
    useEffect(() => {
        if (isOpen) {
            ModalRootElement?.appendChild(domElement)
            return () => {
                ModalRootElement?.removeChild(domElement)
            }
        }
    }, [isOpen, domElement, ModalRootElement])

    return { domElement }
}

export const useClick = (setIsOpen: (isOpen: boolean) => void) => {
    return useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])
}