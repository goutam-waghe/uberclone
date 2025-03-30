import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { CaptainContext } from '../context/CaptainContext'
import axios from 'axios'
const CaptainLogin = () => {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate()
  const {captain , setCaptain } = useContext(CaptainContext);
  const [captainStatus , setCaptainStatus]= useState("")
  async function submitHandler(e)
  {

    e.preventDefault();
    console.log(email , password)
    let captain = {
      email , password
    }
    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/login` , captain)
    console.log(response)
    if(response.status === 200)
      {
        setCaptain(response.data.user)
        localStorage.setItem("token" ,response.data.token );
        navigate("/captain-home")
      }
      
    } catch (error) {
     
     if(error.response.status === 400 && (error.response?.data?.Message ||  error.response?.data?.errors[0].msg))
     {
      setCaptainStatus(error.response?.data?.Message ||  error.response?.data?.errors[0]?.msg);
     }else {
      setCaptainStatus("");
     }
    }
 
  
    setEmail("");
    setPassword("")
  }
  return (
    <div className='w-full h-screen flex flex-col  justify-between items-center'>
      <form onSubmit={submitHandler} className='mt-8 flex flex-col gap-3 items-center' action="">
        <h1>Login As Captain</h1>
        <div>
        <h3 className='text-lg '>Enter your Email</h3>
        <input  value={email} onChange={(e) =>setEmail(e.target.value)}  className='  text-lg py-2 px-3 bg-gray-300 w-[320px]' required type="email" />
        </div>
        <div>
        <h3  className='text-lg ' >Enter your password</h3>
        <input value={password} onChange={(e) =>setPassword(e.target.value)} className='py-2 px-3 bg-gray-300 w-[320px] text-lg' required type="password" />
        </div>
        <button className='bg-black text-white w-[320px] text-lg px-4 py-2'>Login</button>
        <h3  className='text-lg'>Don't have an Account ?<Link className='text-blue-600' to={"/captainsignup"}> Create Account</Link></h3>
        <h2 className='text-red-500 text-center'>{captainStatus}</h2>
      </form>
      <Link to={"/userlogin"}>
      <div className='mb-8 bg-black text-white w-[320px] text-lg px-4 py-2 text-center'>Login as user</div></Link>
    </div>
  )
}

export default CaptainLogin
