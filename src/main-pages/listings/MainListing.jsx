import React from "react";
import './MainListing.css'
import Listing from "./Listings";
import DListings from "./DListing";

export default function MainListing () {
    return(
        <div className="main-home-area">
            <div className="mobile">
                <Listing/>
            </div>
            <div className="desktop">
                <DListings/>
            </div>
        </div>
    )
}

