import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch} from "store/hooks"
import { activatedThunk } from "store/authSlice"
import { Preloader } from "components/common/Preloader/Preloader"
import { AppContainer } from "components/app/Containers/AppContainer"
import ErrorBoundary from "components/app/ErrorBoundary/ErrorBoundary"
import AppRouter from "components/app/Router"
import { CookiePopUp } from "components/common/Modal/Parent"
import { parseActivatedRoutes } from "components/app/utils/parseActivatedRoutes"


const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const initializeApp = useCallback(() => {
    dispatch(activatedThunk())
      .then(message => {
        setLoading(false)
        parseActivatedRoutes(message, navigate)
      })
      .catch((error) => {
        setLoading(false)
        navigate("/error")        
      })
    // eslint-disable-next-line
  }, []) 

  useEffect(() => {
      initializeApp()
  }, [initializeApp])

  if (loading) {
    return <Preloader/>
  }
  
  return (
    <AppContainer>
      <ErrorBoundary>
        <AppRouter/>
      </ErrorBoundary>
      <CookiePopUp/>
    </AppContainer>
  );
}

export default App