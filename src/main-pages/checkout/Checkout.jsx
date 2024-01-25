// Checkout.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.scss'; // Import the SCSS file
import Header from '../../components/header/Header';
import { RiCoupon2Line, RiSecurePaymentLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { GiCardPickup } from "react-icons/gi";

import Footer from '../../components/footer/Footer';
import { useCart } from '../../context/CartContext';


const Checkout = () => {

  const navigate = useNavigate();
  const { cartItems,totalItems, totalPrice, addToCart, removeFromCart } = useCart();

  return (
    <div className="checkout-container">

      <title>Checkout | {totalItems}</title>

      <div className='header-section'>
        <Header showBack={true} showSearch={true} />
      </div>
      <div className='agreement'>By proceeding, you are automatically accepting the <span style={{color: 'blue', textDecoration: 'underline'}}>Terms and conditions</span></div>

      {/* Order summery header */}
      <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '600'}}> ORDER SUMMERY</div>

      <div className='sec-1' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{color: 'black', fontSize: 12, fontWeight: '300', paddingTop: 10}}>Items' total ({totalItems})</div>
          <div style={{color: 'black', fontSize: 12, fontWeight: '400', paddingTop: 10}}>UGX {(totalPrice).toLocaleString()}</div>
      </div>
      <div className='sec-1' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{color: 'black', fontSize: 12, fontWeight: '300', }}>Delivery fees</div>
          <div style={{color: 'black', fontSize: 12, fontWeight: '400', }}>UGX {(3900).toLocaleString()}</div>
      </div>

      <div className='sec-1' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{color: 'black', fontSize: 12, fontWeight: '500', paddingBlock: 12}}>Total</div>
          <div style={{color: 'black', fontSize: 12, fontWeight: '700', paddingBlock: 12}}>UGX {(totalPrice + 3900).toLocaleString()}</div>
      </div>

      <div className='sec-2' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10
    }}>
          <div className='input-sec' style={{}}>
            <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8}}><RiCoupon2Line size={16} color={'grey'}/></span>
            <input className='input' placeholder='Enter coupon' style={{color: 'black', fontSize: 16}} />
          </div>
          <span style={{color: 'grey', fontSize: 12, fontWeight: '700', paddingBlock: 12, width: '15%', display: 'flex', justifyContent: 'center'}}>APPLY</span>
      </div>

      {/* Payment method header */}
      <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '500', display: 'flex', justifyContent: 'space-between'}}>
         <div>PAYMENT MODE</div>
         <div style={{color: 'orange'}}>CHANGE</div>
      </div>

      <div className='sec-3'>
        <RiSecurePaymentLine size={20} color={'orange'} style={{paddingRight: 15}}/>
        <div className='pay'>
          <div style={{fontWeight: '600', fontSize: 12}}>Mobile money</div>
          <div style={{fontSize: 11, }} >{("Pay with your MTN / Airtel mobile money account. Please use number format as follows: 2567xxxxxxxx").substring(0, 55)}...</div>
        </div> 
      </div>
      
      {/* Customer address header */}
      <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '500', display: 'flex', justifyContent: 'space-between'}}>
         <div>CUSTOMER ADDRESS</div>
         <div style={{color: 'orange'}}>CHANGE</div>
      </div>

      <div className='sec-2' style={{paddingBlock: 5}}>
        <div style={{fontWeight: '600', fontSize: 10, color: 'grey'}}>MWESIGWA CHRISTOPHER</div>
        <div style={{fontSize: 10, color: 'grey' }} >{("Kyanja Ring road, Nakawa division | Kampala central division | Uganda | East Africa").substring(0, 75)}...</div> 
      </div>

      {/* Delivery details header */}
      <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '500', display: 'flex', justifyContent: 'space-between'}}>
         <div>DELIVERY DETAILS</div>
         <div style={{color: 'orange'}}>CHANGE</div>
      </div>

      <div className='sec-4'>
        <div className='inner-details'>
          <GiCardPickup size={20} color={'orange'} style={{paddingRight: 15}}/>
          <div className='pay'>
            <div style={{fontWeight: '600', fontSize: 12}}>Pick-up</div>
            <div style={{fontSize: 11, }} >Delivery between <span style={{fontWeight: '600'}}>18th Jan</span> and <span style={{fontWeight: '600'}}>20th Jan</span></div>
          </div> 
        </div> 

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBlock: 10, fontWeight: '600', color: 'orange', fontSize: 14, paddingTop: 10}} onClick={() => navigate('/cart')}>MODIFY CART</div>
      </div>

      <div className='sec-4' style={{padding: 8, marginBlock: 15, marginBottom: 15, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'orange', cursor: 'pointer'}} onClick={() => navigate('/cart')}> <span><FaAngleLeft /></span>Go back and continue shopping</div>

      {/* <div className='sec-4' style={{padding: 8, marginBlock: 15, marginBottom: 15}}></div> */}
        
      <div className='cfm-order' onClick={() => navigate('/payment')}>CONFIRM ORDER</div>

      <div style={{marginTop: 80}}>
        <Footer/>
      </div>
    </div>
  );
}

export default Checkout;



