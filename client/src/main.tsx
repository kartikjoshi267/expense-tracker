import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserContext.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { ScreenResizeProvider } from './context/ScreenSizeContext.tsx'
import { ExpenseProvider } from './context/ExpensesContext.tsx'
import { ModalContextProvider } from './context/ModalContext.tsx'
import ModalProvider from './context/providers/ModalProvider.tsx'
import { SourceProvider } from './context/SourcesContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScreenResizeProvider>
      <ModalContextProvider>
        <UserProvider>
          <SourceProvider>
            <ExpenseProvider>
              <ModalProvider />
              <App />
            </ExpenseProvider>
          </SourceProvider>
        </UserProvider>
      </ModalContextProvider>
    </ScreenResizeProvider>
  </BrowserRouter>,
)
