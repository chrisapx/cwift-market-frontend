import { useState } from 'react'
import '../src/components/search/Search.scss'
import Home from './main-pages/home/Home'
import SearchPage from './main-pages/search/SearchPage'
import { Route, Routes } from 'react-router-dom'
import SearchResults from './main-pages/search-results/SearchResults'
import Details from './main-pages/details/Details'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/details" element={<Details />} />
        <Route path="/no-results" />
      </Routes>
    </div>
  )
}

export default App
