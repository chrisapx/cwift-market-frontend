import React from "react";
import Footer from "../../components/d-footer/Footer";
import DHeader from "../../components/header/DHeader";

export default function DCart () {

    return(
        <div>
            <div>
                <DHeader/>
            </div>
            <div>
                <Footer/>
            </div>

            {/* <div className='checkout-cart' onClick={{}}>
                <div style={{backgroundColor: 'orange', borderRadius: 3, width: '100%', marginInline: 10, cursor: 'pointer'}} className='inner-item' onClick={{}}>CHECKOUT (UGX {(2344000).toLocaleString() })</div>
            </div> */}
        </div>
    )
}