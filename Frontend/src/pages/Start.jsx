import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/uber.png"
const Start = () => {
  return (
    <div>
      <div className=' bg-cover bg-center bg-[url("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1696243819/assets/18/34e6fd-33e3-4c95-ad7a-f484a8c812d7/original/fleet-management.jpg")] h-screen w-full flex flex-col justify-between'>
        <img className='w-20 pl-3' src={logo} alt="" />
        <div className=' bg-white flex flex-col gap-2 p-3 justify-center items-center'>
          <h3>click to start you journey</h3>
          <Link to={"/userlogin"} className='bg-black w-1/2 text-center text-white text-lg p-2 '>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
