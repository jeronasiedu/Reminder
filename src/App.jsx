import './App.css'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
import SignUp from './screens/SignUp/SignUp'
import LogIn from './screens/LogIn/LogIn'
import ForgotPassword from './screens/ForgotPassword/ForgotPassword'
import ResetPassword from './screens/ResetPassword/ResetPassword'
import NotFound from './screens/NotFound/NotFound'
import { AnimatePresence } from 'framer-motion'
function App() {
  const { sideBarOpen } = useSelector((state) => state.UI)
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <div className="App">
              {sideBarOpen && <Sidebar />}
              <Main />
            </div>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
