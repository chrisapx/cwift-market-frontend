import React from "react";
import './MainCheckout.css'
import Checkout from "./Checkout";
import DCheckout from "./DCheckout";

const MainCheckout = () => {
    return(
        <div className="main-home-area">
            <div className="mobile">
                <Checkout/>
            </div>
            <div className="desktop">
                <DCheckout/>
            </div>
        </div>
    )
}

export default MainCheckout;