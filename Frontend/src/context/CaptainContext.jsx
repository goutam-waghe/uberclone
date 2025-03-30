import React, { createContext, useState } from 'react';

// Create the context
export const CaptainContext = createContext();

// Create the provider component
const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState({});

 

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainProvider;