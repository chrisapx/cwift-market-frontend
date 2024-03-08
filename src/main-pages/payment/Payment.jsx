
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Payment.scss'; 
import { useCart } from '../../context/CartContext';

const Payment = () => {

  const { pstatus } = useParams();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  },[])

  return (
    <div className="payments-container">
    {pstatus == true ? <div style={{fontSize: 16, color: 'grey', fontWeight: '500', textAlign: 'center'}}>Order Placed successfuly. You can now sit and wait for order processing updates on email or phone. Thank you for shopping with Nalmart, we are blessed to have you!</div> : <div style={{fontSize: 16, color: 'grey', fontWeight: '500', textAlign: 'center'}}>Payment Failed</div>}      
    <div style={{color: 'orange', textDecoration: 'underline'}} onClick={() => navigate('/')}>Back to Home</div>

      <div>

      <div style={{fontSize: 16, color: 'grey', fontWeight: '500', textAlign: 'center'}}>Call:  +256 750584763 or </div>
      <div style={{fontSize: 16, color: 'grey', fontWeight: '500', textAlign: 'center'}}>+256 742708785</div>
      <div style={{fontSize: 16, color: 'grey', fontWeight: '500', textAlign: 'center'}}>For enquiries</div>

      </div>

    </div>
  );
}

export default Payment;
