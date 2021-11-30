import './App.css'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import SignUp from './screens/SignUp/SignUp'
import LogIn from './screens/LogIn/LogIn'
import ForgotPassword from './screens/ForgotPassword/ForgotPassword'
import ResetPassword from './screens/ResetPassword/ResetPassword'
function App() {
  const { sideBarOpen } = useSelector((state) => state.UI)

  return (
    <Routes>
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
    </Routes>
  )
}

export default App
