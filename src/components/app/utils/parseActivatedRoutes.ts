import { NavigateFunction } from "react-router-dom"
import { HAS_TO_LOGIN, HAS_TO_REGISTER, NOT_ACTIVATED } from "store/constants/errors-constants"
import { MOVE_TO_NEW_PASSWORD } from "store/constants/local-storage-constants"


export const parseActivatedRoutes = (message: string | undefined, navigate: NavigateFunction) => {
    switch (message) {
        case NOT_ACTIVATED:
            navigate("/")
            return
        case HAS_TO_LOGIN:
            navigate("/login")
            return
        case HAS_TO_REGISTER:
            navigate("/registration")
            return
        case MOVE_TO_NEW_PASSWORD:
            navigate("/new_password")
            return
        default:
            return
    }
}