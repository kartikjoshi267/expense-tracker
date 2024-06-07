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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AxiosInstanceProvider>
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
    </AxiosInstanceProvider>
  </BrowserRouter>,
)
