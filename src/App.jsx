import { Suspense, lazy, useEffect, useState } from 'react'
// import '../src/components/search/Search.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AddItem from './seller-pages/add-item/AddItem'
import { CartProvider } from './context/CartContext'
import AdminHome from './seller-pages/home-page/AdminHome'
import { ListingProvider } from './context/ListingContext'
import MainHome from './main-pages/home/MainHome'
import MainDetails from './main-pages/details/MainDetails'
import MainListing from './main-pages/listings/MainListing'
import ContextProvider from './context/ContextProvider'
import Notification from './components/Notification'
import Loading from './actions/utils/Loader'
import OtpDialogue from './auth-pages/user/OtpDialogue'
import { CircularProgress } from '@mui/material'
import PhotosAction from './actions/PhotosAction'
// import MainCheckout from './main-pages/checkout/MainCheckout'

const SearchPage = lazy(() => import('./main-pages/search/SearchPage'))
const SearchResults = lazy(() => import('./main-pages/search-results/SearchResults'))
const NotFoundPage = lazy(() => import('./main-pages/notFound/NotFound'))
const MainCart = lazy(() => import('./main-pages/cart/MainCart'))
const Account = lazy(() => import('./main-pages/profile/Account'))
const MainCheckout = lazy(() => import('./main-pages/checkout/MainCheckout'))
const Payment = lazy(() => import('./main-pages/payment/Payment'))
const Listing = lazy(() => import('./main-pages/listings/Listings'))
const Login = lazy(() => import('./auth-pages/login/LoginPage'))
const Signup = lazy(() => import('./auth-pages/signup/Signup'))


function App() {

  return (
    <div className='app-container'>
      <Notification />
      <Loading/>
      <PhotosAction/>
      <OtpDialogue/>
        <ListingProvider>
          <CartProvider>
            <Suspense fallback={
                <div className="fallback-container">
                  <CircularProgress  sx={{ color: 'white' }}/>
                  <img src={'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcwift-logo.png8e87a133-f46c-44b9-addc-d677e44efed5?alt=media&token=ef17292f-094b-4107-96b5-d0572146e20b'} alt="Spinning Logo" className="spinning-logo" />
                </div> } >
              <Routes>
                  <Route path="/" element={ <MainHome/> } />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/search-results/:input" element={<SearchResults />} />
                  <Route path="/details/:itemID" element={<MainDetails />} />
                  <Route path="/cart" element={<MainCart />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/checkout/:totalPrice" element={<MainCheckout />} />
                  <Route path="/payment/:pstatus" element={<Payment />} />
                  <Route path="/listings/:category" element={<MainListing />} />
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