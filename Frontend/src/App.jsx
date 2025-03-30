import React, { useContext } from "react"
import { BrowserRouter as Router , Routes , Route} from "react-router-dom"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import Start from "./pages/Start"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import { UserDataContext } from "./context/userContext"
import Home from "./pages/Home"
import UserProtectedWrapper from "./pages/UserProtectedWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainProtectedWrapper from "./pages/Captainprotectorwrapper"
const App = () => {
  const ans = useContext(UserDataContext)
 
  return (
    <div className='text-xl'>
      
      <Router>
      <Routes>
       <Route path='/' element={<Start/>} />
       <Route path='/userlogin' element={<UserLogin/>} />
       <Route path='/usersignup' element={<UserSignup/>} />
       <Route path='/captainlogin' element={<CaptainLogin/>} />
       <Route path='/captainsignup' element={<CaptainSignup/>} />
       <Route path='/userlogout' element={<UserLogout/>} />
       <Route path='/home' element={
        <UserProtectedWrapper><Home/></UserProtectedWrapper>
        } />
       <Route path='/captain-home' element={
        <CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>
        } />
      </Routes>
      </Router>
    </div>
  )
}

export default App
