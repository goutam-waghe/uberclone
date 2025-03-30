import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {


    const token = localStorage.getItem('token');
    console.log(token)
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}user/logout` , {
      headers:{
        Authorization:`bearer ${token}`
      }
    }).then((response) =>
    {
       
   if (response.status == 200)
    {
     localStorage.removeItem('token');
     navigate("/userlogin")
    }
 
    } )

 
  return (
    <div>
      logout
    </div>
  )
}

export default UserLogout
