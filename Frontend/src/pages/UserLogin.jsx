import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { UserDataContext } from '../context/userContext'
const UserLogin = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [userStatus, setUserStatus] = useState("");
  // const [userData , setUserData] = useState("");
  const {user , setUser} = useContext(UserDataContext);
  const navigate = useNavigate();
  async function submitHandler(e)
  {
    e.preventDefault();
    
    let loginuser = {
      email , password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}user/login` ,loginuser )
  
      if(response.status === 200)
      {
        setUser(response.data.user)
        localStorage.setItem("token" , response.data.token)
        
        navigate("/home")
      }
    } catch (error) {
      if(error.response && error.response.status === 401)
      {
        setUserStatus(error.response.data.Message)
      } else {
        setUserStatus("")
      }
    }
   
   
  
    setEmail("");
    setPassword("")
  }
  return (
    <div className='w-full h-screen flex flex-col  justify-between items-center'>
      <form onSubmit={submitHandler} className='mt-8 flex flex-col gap-3 items-center' action="">
        <h1>Login as User</h1>
        <div>
        <h3 className='text-lg '>Enter your Email</h3>
        <input  value={email} onChange={(e) =>setEmail(e.target.value)}  className='  text-lg py-2 px-3 bg-gray-300 w-[320px]' required type="email" />
        </div>
        <div>
        <h3  className='text-lg ' >Enter your password</h3>
        <input value={password} onChange={(e) =>setPassword(e.target.value)} className='py-2 px-3 bg-gray-300 w-[320px] text-lg' required type="password" />
        </div>
        <button className='bg-black text-white w-[320px] text-lg px-4 py-2'>Login</button>
        <h3  className='text-lg'>Don't have an Account ?<Link className='text-blue-600' to={"/usersignup"}> Create Account</Link></h3>
        <h3 className='text-red-500 text-xl '>{userStatus}</h3>
      </form>
      <Link to={"/captainlogin"}>
      <div className='mb-8 bg-black text-white w-[320px] text-lg px-4 py-2 text-center'>Login as Captain</div></Link>
    </div>
  )
}

export default UserLogin
