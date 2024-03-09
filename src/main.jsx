import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ListingProvider } from './context/ListingContext.jsx'
import ContextProvider from './context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <ListingProvider>
          <App />
        </ListingProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
