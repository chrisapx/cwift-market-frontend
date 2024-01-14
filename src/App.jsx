import { useState } from 'react'
import '../src/components/search/Search.scss'
import Home from './main-pages/home/Home'
import SearchPage from './main-pages/search/SearchPage'
import { Route, Routes } from 'react-router-dom'
import SearchResults from './main-pages/search-results/SearchResults'
import Details from './main-pages/details/Details'
import NotFoundPage from './main-pages/notFound/NotFound'
import Cart from './main-pages/cart/Cart'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />      
      </Routes>
    </div>
  )
}

export default App
