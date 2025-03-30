import React  , {useContext, useEffect} from 'react'

import { useNavigate } from 'react-router-dom';
import { CaptainContext } from '../context/CaptainContext';

const CaptainProtectedWrapper = ({children}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { captain } = useContext(CaptainContext);
  console.log("hi")
  console.log(token)
  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
    }
  }, [token, navigate]);

  return (
    <div>
    {children}
    </div>
  )
}

export default CaptainProtectedWrapper
