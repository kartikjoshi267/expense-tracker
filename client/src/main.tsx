import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserContext.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { ScreenResizeProvider } from './context/ScreenResizeContext.tsx'
import { ExpenseProvider } from './context/ExpensesContext.tsx'
import { ModalContextProvider } from './context/ModalContext.tsx'
import ModalProvider from './context/providers/ModalProvider.tsx'
import { SourceProvider } from './context/SourcesContext.tsx'
import { AxiosInstanceProvider } from './context/AxiosInstanceContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './config/config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AxiosInstanceProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ScreenResizeProvider>
          <ModalContextProvider>
            <UserProvider>
              <ExpenseProvider>
                <SourceProvider>
                  <ModalProvider />
                  <App />
                </SourceProvider>
              </ExpenseProvider>
            </UserProvider>
          </ModalContextProvider>
        </ScreenResizeProvider>
      </GoogleOAuthProvider>
    </AxiosInstanceProvider>
  </BrowserRouter>,
)
