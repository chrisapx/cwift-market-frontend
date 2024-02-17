import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ListingProvider } from './context/ListingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ListingProvider>
        <App />
      </ListingProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
