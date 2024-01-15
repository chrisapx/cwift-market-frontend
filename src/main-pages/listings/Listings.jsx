
import React from 'react';
import { Link } from 'react-router-dom';
import './Listings.scss'; 
import Header from '../../components/header/Header';

const Listing = () => {
  return (
    <div className="listings-container">

        <div>
            <Header showBack={true} showSearch={true}/>
        </div>
      This is the listings page
    </div>
  );
}

export default Listing;
