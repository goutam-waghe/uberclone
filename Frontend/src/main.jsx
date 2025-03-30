import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/userContext.jsx'
import CaptainProvider from './context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(

  <CaptainProvider>
        <UserContext>
      <App />
    </UserContext>
      </CaptainProvider>
 

)
