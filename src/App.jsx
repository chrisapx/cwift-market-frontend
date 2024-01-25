import { Suspense, lazy, useState } from 'react'
// import '../src/components/search/Search.scss'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AddItem from './seller-pages/add-item/AddItem'
import { CartProvider } from './context/CartContext'

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
      <CartProvider>
        <Suspense fallback={
            <div className="fallback-container">
              <img src={'/src/assets/cwift-logo.png'} alt="Spinning Logo" className="spinning-logo" />
            </div> } >
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/details/:itemID" element={<Details />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/listings" element={<Listing />} />
              <Route path="/add-item" element={<AddItem />} />
              {/* <Route path="/auth/login " element={<Auth />} /> */}
              <Route path="*" element={<NotFoundPage />} />      
          </Routes>
        </Suspense>
      </CartProvider>
    </div>
  )
}

export default App


// const Home = lazy(() => import('./pages/Home'))
// const SelectCity = lazy(() => import('./pages/SelectCity'))
// const CityPage = lazy(() => import('./pages/City'))
 
// const App = () => {
//    return (
//        <Router>
//            <Suspense fallback={<h1>Loading...</h1>}>
//                <Switch>
//                    <Route exact component={Home} path="/" />
//                    <Route component={SelectCity} path="/select-city" />
//                    <Route component={CityPage} path="/:city" />
//                </Switch>
//            </Suspense>
//        </Router>
//    )
// }