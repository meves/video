import React, { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { useAppSelector } from "store/hooks"
import { selectIsAuth } from "store/authSlice"
import { HomePage } from "pages/Home/HomePage"
import { withSuspense } from "hoc/withSuspense"
import { StubModal } from "components/common/Modal/Parent"
import NotFoundPage from "pages/Errors/NotFoundPage"
import ServerErrorPage from "pages/Errors/ServerErrorPage"
const TermsOfServisePage = lazy(() => import("pages/Legal/TermsOfServisePage"))
const PrivacyStatementPage = lazy(() => import("pages/Legal/PrivacyStatementPage"))
const WatchVideoPage = lazy(() => import("pages/MyVideos/WatchVideoPage"))
const MyNotesPage = lazy(() => import("pages/MyVideos/MyNotesPage"))
const FAQPage = lazy(() => import("pages/FAQ/FAQPage"))
const AfterRemoveAccountPage = lazy(() => import("pages/AfterRemoveAccount/AfterRemoveAccountPage"))
const LoginPage = lazy(() => import("pages/Forms/LoginPage"))
const RegistrationPage = lazy(() => import("pages/Forms/RegistrationPage"))
const ThankForRegistrationPage = lazy(() => import("pages/Forms/ThankPage"))
const PersonalAreaEditPage = lazy(() => import("pages/PersonalArea/PersonalAreaEditPage"))
const ChangePasswordPage = lazy(() => import("pages/Forms/ChangePasswordPage"))
const ForgetPasswordPage = lazy(() => import("pages/Forms/ForgetPasswordPage"))
const NewPasswordPage = lazy(() => import("pages/Forms/NewPasswordPage"))
const StartTestVideoPage = lazy(() => import("pages/RecordVideo/StartTestVideoPage"))
const TestVideoPage = lazy(() => import("pages/RecordVideo/TestVideoPage"))
const InfoAndStartVideoPage = lazy(() => import("pages/RecordVideo/InfoAndStartVideoPage"))
const RecordVideoPage = lazy(() => import("pages/RecordVideo/RecordVideoPage"))


const AppRouter = () => {
    const isAuth = useAppSelector(selectIsAuth)

    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />            
            {/* Аутентификация */}
            <Route path="/login" element={withSuspense(LoginPage)} />
            <Route path="/registration" element={withSuspense(RegistrationPage)} />
            <Route path="/thank" element={withSuspense(ThankForRegistrationPage)} />
            {/* legal pages */}
            <Route path="/privacy" element={withSuspense(PrivacyStatementPage)} />
            <Route path="/terms" element={withSuspense(TermsOfServisePage)} />
            {/* Pages */}
            <Route path="/removed" element={withSuspense(AfterRemoveAccountPage)} />
            <Route path="/faq" element={withSuspense(FAQPage)} />
            {/* Пароли */}
            <Route path="/forget_password" element={withSuspense(ForgetPasswordPage)} />
            <Route path="/new_password" element={withSuspense(NewPasswordPage)} />
            <Route path="/change_password" element={withSuspense(ChangePasswordPage)} />
            {/* Ошибки */}
            <Route path="/error" element={<ServerErrorPage/>} />
            <Route path="/notfound" element={<NotFoundPage/>} />
            { isAuth ?
            <>
            {/* Личный кабинет */}
            <Route path="/lk" element={withSuspense(PersonalAreaEditPage)} />    
            {/* Пароли */}
            {/* Видео */}
            <Route path="/start" element={withSuspense(StartTestVideoPage)} />
            <Route path="/test" element={withSuspense(TestVideoPage)} />
            <Route path="/info" element={withSuspense(InfoAndStartVideoPage)} />
            <Route path="/record" element={withSuspense(RecordVideoPage)} />
            {/* Записи */}
            <Route path="/mynotes" element={withSuspense(MyNotesPage)} />
            <Route path="/watch" element={withSuspense(WatchVideoPage)} />
            </>  : null }
            <Route path="*" element={<StubModal/>} />
        </Routes>
    )
}

export default AppRouter