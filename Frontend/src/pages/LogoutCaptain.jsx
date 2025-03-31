import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutCaptain = () => {
    const token = localStorage.getItem('token');
   
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}captain/logout` , {
      headers:{
        Authorization:`bearer ${token}`
      }
    }).then((response) =>
    {
       
   if (response.status == 200)
    {
     localStorage.removeItem('token');
     navigate("/captainlogin")
    }
 
    } )

 
  return (
    <div>
      logout
    </div>
  )
}

export default LogoutCaptain
