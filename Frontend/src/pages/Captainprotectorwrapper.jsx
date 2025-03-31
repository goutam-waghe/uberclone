import React  , {useContext, useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { CaptainContext } from '../context/CaptainContext';
import axios from 'axios';


const CaptainProtectedWrapper = ({children}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { captain , setCaptain } = useContext(CaptainContext);
  const [isLoading  , SetIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
    }
  }, [token, navigate]);

  axios.get(`${import.meta.env.VITE_BASE_URL}captain/profile` , {
    headers:{
      Authorization:`bearer ${token}` 
    }
  }).then((response) => {
    if(response.status === 200)
    {
   
      SetIsLoading(false);
      setCaptain(response.data.user)
    }
  }).catch((err) => {
   
    localStorage.removeItem("token");
    navigate("/captainlogin")
  })
if(isLoading)
{
  return <h1>Loding...</h1>
}

  
  return (
    <div>
    {children}
    </div>
  )
}

export default CaptainProtectedWrapper
