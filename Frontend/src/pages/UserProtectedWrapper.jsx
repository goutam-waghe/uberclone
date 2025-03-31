import React  , {useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({children}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { user , setUser } = useContext(UserDataContext);
  const [isLoading ,SetIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
    }
  }, [token, navigate]);

  axios.get(`${import.meta.env.VITE_BASE_URL}user/profile` , {
    headers:{
      Authorization:`bearer ${token}` 
    }
  }).then((response) => {
    if(response.status === 200)
    {
      SetIsLoading(false);
      setUser(response.data.user)
    }
  }).catch((err) => {
    localStorage.removeItem("token");
    navigate("/userlogin")
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

export default UserProtectedWrapper
