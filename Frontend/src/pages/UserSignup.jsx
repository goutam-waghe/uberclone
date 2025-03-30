import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { UserDataContext } from "../context/userContext"

const UserSignup = () => {

  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("")
  // const [userData, setUserData] = useState({});
  const [userStatus , SetUserStatus] = useState("")

  const { user, setUser } = useContext(UserDataContext)


  const navigate = useNavigate()
  async function submitHandler(e) {
    e.preventDefault();
try {
  let newUser = {
    email, password, fullname: { firstname, lastname }
  }
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}user/register`, newUser)

  console.log(response.data)
  console.log("helow")
 
  if (response.status === 201) {
    const data = response.data
    localStorage.setItem("token" , data.token)
    setUser(data.user)
    navigate('/home')
  }
} catch (error) {
  if(error.response && error.response.data.message)
  {
    SetUserStatus(error.response.data?.message)
  }


}
    
    setFirstname("")
    setLastname("")
    setEmail("");
    setPassword("")
  }
  return (

    <div className='w-full h-screen flex flex-col  justify-between items-center'>
      <form onSubmit={submitHandler} className='mt-8 flex flex-col gap-3 items-center' action="">
        <div >
          <h3 className='text-lg '>what's your name</h3>
          <div className='flex gap-[20px]'>
            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className='text-lg py-2 px-3 bg-gray-300 w-[150px] placeholder:text-sm' required type="text" placeholder='Firstname' />
            <input value={lastname} onChange={(e) => setLastname(e.target.value)} className='text-lg py-2 px-3 bg-gray-300 w-[150px] placeholder:text-sm' required type="text" placeholder='Lastname' />
          </div>

        </div>
        <div>
          <h3 className='text-lg '>Enter your Email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='  text-lg py-2 px-3 bg-gray-300 w-[320px] placeholder:text-sm' required type="email" placeholder='example@gmail.com' />
        </div>
        <div>
          <h3 className='text-lg ' >Enter your password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='py-2 px-3 bg-gray-300 w-[320px] text-lg placeholder:text-sm' required type="password" placeholder='password' />
        </div>
        <button className='bg-black text-white w-[320px] text-lg px-4 py-2'>Register</button>
        <h3 className='text-lg'>Already have an Account ?<Link className='text-blue-600' to={"/userlogin"}> Login Account</Link></h3>
        <h3 className='text-red-500 text-xl '>{userStatus}</h3>
      </form>
      <Link to={"/captainsignup"}>
        <div className='mb-8 bg-black text-white w-[320px] text-lg px-4 py-2 text-center'>Register as Captain</div></Link>
    </div>
  )
}

export default UserSignup
