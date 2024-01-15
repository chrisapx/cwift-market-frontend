import { useState } from 'react'
import '../src/components/search/Search.scss'
import Home from './main-pages/home/Home'
import SearchPage from './main-pages/search/SearchPage'
import { Route, Routes } from 'react-router-dom'
import SearchResults from './main-pages/search-results/SearchResults'
import Details from './main-pages/details/Details'
import NotFoundPage from './main-pages/notFound/NotFound'
import Cart from './main-pages/cart/Cart'
import Account from './main-pages/profile/Account'
import Checkout from './main-pages/checkout/Checkout'
import Payment from './main-pages/payment/Payment'
import Listing from './main-pages/listings/Listings'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="*" element={<NotFoundPage />} />      
      </Routes>
    </div>
  )
}

export default App
