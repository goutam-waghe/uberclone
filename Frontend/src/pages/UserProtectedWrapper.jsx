import React  , {useContext, useEffect} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({children}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { user } = useContext(UserDataContext);
  console.log("hi")
  console.log(token)
  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
    }
  }, [token, navigate]);

  return (
    <div>
    {children}
    </div>
  )
}

export default UserProtectedWrapper
