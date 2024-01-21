import { Suspense, lazy, useState } from 'react'
import '../src/components/search/Search.scss'
import { Route, Routes } from 'react-router-dom'
import AddItem from './seller-pages/add-item/AddItem'
// import Home from './main-pages/home/Home'
// import SearchPage from './main-pages/search/SearchPage'
// import SearchResults from './main-pages/search-results/SearchResults'
// import Details from './main-pages/details/Details'
// import NotFoundPage from './main-pages/notFound/NotFound'
// import Cart from './main-pages/cart/Cart'
// import Account from './main-pages/profile/Account'
// import Checkout from './main-pages/checkout/Checkout'
// import Payment from './main-pages/payment/Payment'
// import Listing from './main-pages/listings/Listings'
// import Login from './auth-pages/login/Login'
// import Signup from './auth-pages/signup/Signup'

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
    <div>
      <Suspense fallback={
        <div style={{display: 'flex', flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
          <h1 style={{color: 'black', backgroundColor: 'transparent'}}>Loading...{console.log("Loaded")}</h1>
        </div>
      }>
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
            <Route path="/add-item" element={<AddItem />} />
            {/* <Route path="/auth/login " element={<Auth />} /> */}
            <Route path="*" element={<NotFoundPage />} />      
        </Routes>
      </Suspense>
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