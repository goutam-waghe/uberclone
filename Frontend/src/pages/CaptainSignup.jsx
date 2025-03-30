import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainContext } from '../context/CaptainContext';
import axios from 'axios'

const UserSignup = () => {
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("")
  // const [captain, setCaptain] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [captainStatus  , setCaptainStatus] = useState("");
  const { setCaptain }= useContext(CaptainContext);
  const navigate = useNavigate()
  async function submitHandler(e) {
    e.preventDefault();
    console.log(email, password, lastname, firstname, vehicleCapacity, vehicleColor, vehiclePlate, vehicleType)
    let newCaptain = {
      email, password, fullname: { firstname, lastname }, vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/register` , newCaptain)
    console.log();
    if(response.status === 200)
    {
      setCaptain(response.data.user);
      localStorage.setItem("token" , response.data.token)
      navigate("/captain-home")
      
    }
    } catch (error) {
    console.log(error)
      if(error.response.status === 400 && (error.response?.data?.Message ||error.response?.data?.errors[0].msg))
      {
        setCaptainStatus(error.response?.data?.Message || error.response?.data?.errors[0].msg);

      }else {
        setCaptainStatus("")
      }
    }
  
    
    setFirstname("")
    setLastname("")
    setEmail("");
    setPassword("")
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleCapacity("")
    setVehicleType("")
  }
  return (

    <div className='w-full h-screen flex flex-col  justify-between items-center'>
      <form onSubmit={submitHandler} className='mt-8 flex flex-col gap-3 items-center' action="">
        <div >
          <h3 className='text-lg '>captain name</h3>
          <div className='flex gap-[20px]'>
            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className='text-md  py-2 px-3 bg-gray-300 w-[150px] placeholder:text-sm' required type="text" placeholder='Firstname' />
            <input value={lastname} onChange={(e) => setLastname(e.target.value)} className='text-md py-2 px-3 bg-gray-300 w-[150px] placeholder:text-sm' required type="text" placeholder='Lastname' />
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
        <div className='w-[320px] flex gap-3'>
          <input value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} className='py-2 px-3 bg-gray-300 w-1/2 text-lg placeholder:text-sm' required type="text" placeholder='color' />
          <input value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} className='py-2 px-3 bg-gray-300 w-1/2 text-lg placeholder:text-sm' required type="text" placeholder='plate' />
        </div>
        <div className='w-[320px] flex gap-3'>
          <input value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} className='py-2 px-3 bg-gray-300 w-1/2 text-lg placeholder:text-sm' required type="number" placeholder='capacity' />
          <select required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className='w-1/2 bg-gray-300 text-lg p-2'>
            <option value="" disabled>vehicletype</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="bike">Bike</option>
          </select>
        </div>
        <button className='bg-black text-white w-[320px] text-lg px-4 py-2'>Register</button>
        <h3 className='text-lg'>Already have an Account ?<Link className='text-blue-600' to={"/userlogin"}> Login Account</Link></h3>
        <h2 className='text-red-500 text-center'>{captainStatus}</h2>
      </form>
      <Link to={"/usersignup"}>
        <div className='mb-8 bg-black text-white w-[320px] text-lg px-4 py-2 text-center'>Register as user</div></Link>
    </div>
  )
}

export default UserSignup
