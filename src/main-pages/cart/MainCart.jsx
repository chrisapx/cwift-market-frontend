import React from "react";
import './MainCart.css'
import Cart from "./Cart";
import DCart from "./DCart";

const MainCart = () => {
    return(
        <div className="main-home-area">
            <div className="mobile">
                <Cart/>
            </div>
            <div className="desktop">
                <DCart/>
            </div>
        </div>
    )
}

export default MainCart;