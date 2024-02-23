// Checkout.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Checkout.scss'; // Import the SCSS file
import Header from '../../components/header/Header';
import { RiCoupon2Line, RiSecurePaymentLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { GiCardPickup } from "react-icons/gi";

import Footer from '../../components/footer/Footer';
import { useCart } from '../../context/CartContext';


const Checkout = () => {

  const navigate = useNavigate();
  const { cart, cartItems,totalItems } = useCart();
  const [ confirm, setConfirm] = useState(false);
  const [ accept, setAccept] = useState(false);
  const [ pStatus, setPstatus] = useState('success');
  const { totalPrice } = useParams();
  const [ checkOutAmount, setCheckoutAmount ] = useState(0);

  const handleConfirmOrder = async () => {

    useEffect(() => {
      console.log("Total price:", totalPrice);
      const price = parseFloat(totalPrice) || 0;
      setCheckoutAmount(price + 3900);
    }, [totalPrice]);
    
    try {
      const modifiedCart = cart.map(order => ({
        ...order,
        itemID: order.item.itemID, 
        userID: 'usR-12988229381',
        orderStatus: 'COMPLETED'  //Check if the payment has been done then you set the order to paid if not set it to Pending
        // item: undefined, 
      }));
  
      const cartData = {
        itemOrders: modifiedCart,
        totalPrice: (parseFloat(totalPrice) + 3900).toLocaleString(),
        deliveryAddress: {},
        paymentStatus: 'DONE', //Create a function to process payment in the payment service and when the payment is complete, Update the payment status field to 'DONE' ON FALSE SAY 'FAILED'
        userID: 'usR-12988229381',
        userEmail: 'mcaplexya@gmail.com'
      };
  
      const createdCart = await createCart(cartData);
      console.log('Created cart:', createdCart);
      setConfirm(true);
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  let dateToday = new Date();

  const createCart = async (cartData) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cart: ' + response.json() );
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error creating cart:', error.message);
      throw error;
    }
  };

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
          <div style={{color: 'black', fontSize: 12, fontWeight: '400', paddingTop: 10}}>UGX {parseFloat(totalPrice).toLocaleString()}</div>
      </div>
      <div className='sec-1' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{color: 'black', fontSize: 12, fontWeight: '300', }}>Delivery fees</div>
          <div style={{color: 'black', fontSize: 12, fontWeight: '400', }}>UGX {(3900).toLocaleString()}</div>
      </div>

      <div className='sec-1' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{color: 'black', fontSize: 12, fontWeight: '500', paddingBlock: 12}}>Total</div>
          <div style={{color: 'black', fontSize: 12, fontWeight: '700', paddingBlock: 12}}>UGX { (parseFloat(totalPrice) + 3900).toLocaleString() }</div>
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

      {/* <div className='sec-3'>
        <RiSecurePaymentLine size={20} color={'orange'} style={{paddingRight: 15}}/>
        <div className='pay'>
          <div style={{fontWeight: '600', fontSize: 12}}>Mobile money</div>
          <div style={{fontSize: 11, }} >{("Pay with your MTN / Airtel mobile money account. Please use number format as follows: 2567xxxxxxxx").substring(0, 55)}...</div>
        </div> 
      </div> */}

      <div className='sec-3'>
        <RiSecurePaymentLine size={20} color={'orange'} style={{paddingRight: 15}}/>
        <div className='pay'>
          <div style={{fontWeight: '600', fontSize: 12}}>Cash On Delivery</div>
          <div style={{fontSize: 11, }} >{("Please ensure to have changed cash with you on picking the item, ").substring(0, 55)}...</div>
        </div> 
      </div>
      
      {/* Customer address header */}
      <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '500', display: 'flex', justifyContent: 'space-between'}}>
         <div>CUSTOMER ADDRESS</div>
         <div style={{color: 'orange'}}>CHANGE</div>
      </div>

      <div className='sec-2' style={{paddingBlock: 5}}>
        <div style={{fontWeight: '600', fontSize: 10, color: 'grey'}}>{"No name yet"}</div> 
        <div style={{fontSize: 10, color: 'grey' }} >{("No address yet, Ensure to attach one").substring(0, 75)}...</div> 
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
            <div style={{fontSize: 11}}>Delivery between <span style={{fontWeight: '600'}}>{dateToday.toDateString()}</span> and <span style={{fontWeight: '600'}}>{new Date(dateToday.setDate(dateToday.getDate() + 2)).toDateString()}</span></div>
          </div> 
        </div> 

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBlock: 10, fontWeight: '600', color: 'orange', fontSize: 14, paddingTop: 10}} onClick={() => navigate('/cart')}>MODIFY CART</div>
      </div>

      <div className='sec-4' style={{padding: 8, marginBlock: 15, marginBottom: 15, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'orange', cursor: 'pointer'}} onClick={() => navigate('/cart')}> <span><FaAngleLeft /></span>Go back and continue shopping</div>

      {/* <div className='sec-4' style={{padding: 8, marginBlock: 15, marginBottom: 15}}></div> */}
        
      <div className='cfm-order' onClick={handleConfirmOrder}>CONFIRM ORDER</div>

      <div style={{marginTop: 80}}>
        <Footer/>
      </div>

      {confirm && 
      <div className='confirm-overlay' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 280, width: 300, padding: 10, borderRadius: 10, backgroundColor: 'white', }}>
          <div>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: 16, color: 'grey', fontWeight: '500'}}>Order placement Confirmation:</div>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: 16, color: 'rgba(0, 10, 60, 0.9)', paddingBlock: 16, fontWeight: '500'}}> mcaplelxya@gmail.com </div>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: 16, color: 'rgba(0, 10, 60, 0.9)', paddingBottom: 16, fontWeight: '500'}}> Payment mode: COD </div>

            <div style={{display: 'flex', justifyContent: 'center', fontSize: 14, alignItems: 'center', textAlign: 'center',  color: 'grey', fontWeight: '500'}}>An email address containing order details will be sent to this number after the order is successfuly placed, Please confirm it is the correct one</div>
            <div style={{display: 'flex', fontSize: 12, alignItems: 'center', textAlign: 'center',  color: 'grey', fontWeight: '400'}}>COD: Cash On Delivery</div>

          </div>
          <div style={{display: 'flex', justifyContent: 'space-around', borderTopStyle: 'solid', borderTopColor: 'rgba(0, 0, 0, 0.2)', borderWidth: 2, paddingBlock: 9}}>
            <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}} onClick={() => setConfirm(false)}>No, edit</div>
            <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: '500', color: 'rgba(0, 10, 60, 0.6)', borderLeftStyle: 'solid', borderLeftColor: 'rgba(0, 0, 0, 0.2)', paddingLeft: 8}} onClick={() => navigate('/payment/' + pStatus)}>Okay, proceed</div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Checkout;



