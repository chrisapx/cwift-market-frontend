import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ListingProvider } from './context/ListingContext.jsx'
import ContextProvider from './context/ContextProvider.jsx'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <ContextProvider>
        <ListingProvider>
          <App />
        </ListingProvider>
      </ContextProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
