import { Suspense, lazy, useEffect, useState } from 'react'
// import '../src/components/search/Search.scss'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AddItem from './seller-pages/add-item/AddItem'
import { CartProvider } from './context/CartContext'
import AdminHome from './seller-pages/home-page/AdminHome'
import { ListingProvider } from './context/ListingContext'

const Home = lazy(() => import('./main-pages/home/Home'))
const SearchPage = lazy(() => import('./main-pages/search/SearchPage'))
const SearchResults = lazy(() => import('./main-pages/search-results/SearchResults'))
const Details = lazy(() => import('./main-pages/details/Details'))
const NotFoundPage = lazy(() => import('./main-pages/notFound/NotFound'))
const Cart = lazy(() => import('./main-pages/cart/Cart'))
const Account = lazy(() => import('./main-pages/profile/Account'))
const Checkout = lazy(() => import('./main-pages/checkout/Checkout'))
const Payment = lazy(() => import('./main-pages/payment/Payment'))
const Listing = lazy(() => import('./main-pages/listings/Listings'))
const Login = lazy(() => import('./auth-pages/login/Login'))
const Signup = lazy(() => import('./auth-pages/signup/Signup'))


function App() {

  return (
    <div className='app-container'>
      <ListingProvider>
        <CartProvider>
          <Suspense fallback={
              <div className="fallback-container">
                <img src={'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcwift-logo.png8e87a133-f46c-44b9-addc-d677e44efed5?alt=media&token=ef17292f-094b-4107-96b5-d0572146e20b'} alt="Spinning Logo" className="spinning-logo" />
              </div> } >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search-results/:input" element={<SearchResults />} />
                <Route path="/details/:itemID" element={<Details />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/checkout/:totalPrice" element={<Checkout />} />
                <Route path="/payment/:pstatus" element={<Payment />} />
                <Route path="/listings/:category" element={<Listing />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path='/admin-home' element={<AdminHome/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFoundPage />} />      
            </Routes>
          </Suspense>
        </CartProvider>
      </ListingProvider>
    </div>
  )
}

export default App


// import React from 'react';
// import { Redirect, Route } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
// );