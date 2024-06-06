import { ToastContainer } from 'react-toastify'
import './App.css'
import MyRouter from './routes'

function App() {
  return (
    <>
      {/* <Header /> */}
      <ToastContainer
        hideProgressBar={true}
        position='bottom-right'
        stacked={true}
      />
      <MyRouter />
      {/* <Footer /> */}
    </>
  )
}

export default App
