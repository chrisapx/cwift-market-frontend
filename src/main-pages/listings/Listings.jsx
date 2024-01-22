
import React from 'react';
import { Link } from 'react-router-dom';
import './Listings.scss'; 
import Header from '../../components/header/Header';

const Listing = () => {
  return (
    <div className="listings-container">
      <title>Cwift Marketplace - Explore Listings</title>
      <meta name="description" content="Browse through a diverse collection of products on the Cwift Marketplace listings page. Discover top-quality items in various categories such as electronics, fashion, home decor, and more. Find the perfect products from trusted sellers. Enjoy a seamless shopping experience with secure transactions and exclusive deals." />
      <div>
        <Header showBack={true} showSearch={true}/>
      </div>
      This is the listings page
    </div>
  );
}

export default Listing;
