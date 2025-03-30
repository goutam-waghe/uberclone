import React, { useState } from "react";

export const UserDataContext = React.createContext();

const UserContext = ({children}) => {
  const [user , setUser] = useState({
    email:"user@gmail.com"  ,
    fullname:{
      firstname:'user' ,
      lastname:'name'
    }
  });
return <UserDataContext.Provider value={{user , setUser}}>
{children}
</UserDataContext.Provider>
}
export default UserContext;