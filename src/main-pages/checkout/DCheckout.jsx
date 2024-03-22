import React, { useEffect, useState } from "react";
import './DCheckout.scss'
import Footer from "../../components/d-footer/Footer";
import DHeader from "../../components/header/DHeader";
import { BsChevronRight, BsSend } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdLocalShipping } from "react-icons/md";
import { useValue } from "../../context/ContextProvider";

export default function DCheckout () {

    const navigate = useNavigate();
    const { cart, totalItems, totalPrice,  getItemQuantity } = useCart();
    const { dispatch } = useValue();
    const [ tPrice, setTPrice ] = useState();
    const [ discount, setDiscount ] = useState();
    const [ deliveryFee, setDeliveryFee] = useState(3600);
    const [ checkoutItems, setCheckoutItems ] = useState([]);
    const [ pStatus, setPstatus] = useState(false);
    const [ couponDiscount, setCouponDiscount ] = useState(0);
    const [ paymentStatus, setPaymentStatus ] = useState('NOT');

    useEffect(() => {
        const totalPrice = cart.reduce((acc, order) => acc + (order.item.price * getItemQuantity(order.item)), 0);
        const disc = cart.reduce((acc, order) => acc + (order.item.globalPrice * getItemQuantity(order.item)), 0);
        setTPrice(totalPrice);
        setDiscount(disc);
    }, [cart, discount, totalItems]);

    useEffect(() => {
        document.title = "Checkout | " + totalItems + " Items";
        // document.description = item.description;

    },[])

    const handleConfirmOrder = async () => {
        dispatch({type: 'START_LOADING'})
    
        try {
          const modifiedCart = cart.map(order => ({
            ...order,
            itemID: order.item.itemID, 
            userID: 'usR-12988229381',
            orderStatus: 'COMPLETED'  //Will Check if the payment has been done then you set the order to paid if not set it to Pending
            // item: undefined, 
          }));
      
          const cartData = {
            itemOrders: modifiedCart,
            totalPrice: (totalPrice + parseFloat(4000) - couponDiscount),
            deliveryAddress: {},
            paymentStatus: paymentStatus, //Will Create a function to process payment in the payment service and when the payment is complete, Update the payment status field to 'DONE' ON FALSE SAY 'FAILED'
            userID: 'usR-12988229381',
            userEmail: 'mcaplexya@gmail.com'
          };
      
          const createdCart = await createCart(cartData);
          console.log('Created cart:', createdCart);
          setConfirm(true);
          
          dispatch({
            type: 'UPDATE_ALERT',
            payload: {
              open: true,
              severity: 'success',
              message: 'Order placed successfully',
            },
          });

          dispatch({type: 'END_LOADING'})        
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                  open: true,
                  severity: 'error',
                  message: 'Unable to place order' +error,
                },
              });
            dispatch({type: 'END_LOADING'})        
        } 
        // finally{
        //     navigate('/payment/' +pStatus)
        // }
    }

    const createCart = async (cartData) => {
        try {
          const response = await 
        //   fetch('http://127.0.0.1:8080/carts', {
            fetch(import.meta.env.VITE_API_URL+'carts', {
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
    }

    const handlePayment = async () => {
        try{
            // call API to handle payment and record DONE if it is successful
            setPaymentStatus('DONE');
            setNote('Payment Successful');        
        }catch(error){
            setPaymentStatus('FAILED' + error);
            setNote('Payment failed')
        }
    }
    

    // const handleSelect = ( name ) => {
    //     if(checkoutItems?.contains(name)) setCheckoutItems([checkoutItems?.filter(e => e?.name !== name)]);
    //     else setCheckoutItems([...checkoutItems]); 
    // }

    return(
        <div className="d-cart-frame">
            <div className="d-cart-header">
                <DHeader/>
                {/* <div >Home {">"} cart</div> */}
                <div className="dir-tracker"> Home {window.location.pathname.replace('/', ' > ')}</div>
            </div>
            {/* <div>
                <UnderDevelopment dev={true}/>
            </div> */}

            <div className="d-cart-body">
                <div className="cb-left">
                    <div style={{height: 50, marginBottom: 12, borderRadius: 6, backgroundColor: 'rgba(0,150,0,0.1)'}}>
                        
                    </div>

                    <div className="shipping-details">
                        <div className="c-one">
                            <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center", paddingRight: 40}}>
                                <div style={{display: "flex", gap: 6, alignItems: "center"}}>
                                    <CiLocationOn size={20}/>
                                    <div style={{fontWeight: '600', fontSize: 15}}>Shipping address</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', fontSize: 'x-small',fontWeight: '400', cursor: 'pointer', color: 'grey', gap: 6}}>
                                    <div>Change address</div>
                                    <BsChevronRight color={'grey'}/>
                                </div>
                            </div>
                            <div style={{height: 100,}}>
                                {/* Shipping address Here */}
                            </div>

                        </div>
                        <div className="c-two">
                            <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                                <MdLocalShipping size={20} color={'grey'}/>
                                <div style={{fontWeight: '600', fontSize: 15}}>Shipping Method</div>
                            </div>
                            <div>
                                {/* Shipping details here */}
                            </div>
                        </div>
                        
                        {/* <PiListBullets size={24}/> */}
                    </div>
                    
                    {/* Items section */}
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{fontWeight: '600', fontSize: 15}}>Item details ( {totalItems} )</div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 'x-small',fontWeight: '500', cursor: 'pointer', color: 'black', gap: 6}}>
                            <div>View all</div>
                            <BsChevronRight/>
                        </div>
                    </div>
                    <div>

                    </div>

                    
                </div>


                <div className="cb-right">
                    <div className="right-header">Order summery</div>
                    <div className="coupon-card">
                        <div className="coupon-container">
                            <input type="text" placeholder="Enter coupon code..." className="coupon"/>
                        </div>
                        <div className="coupon-apply"><span><BsSend/></span>APPLY</div>
                    </div>
                    <div style={{display: 'flex', gap: 8, borderBottom: '1px solid rgba(0,0,0,0.2)', marginBottom: '12px', paddingBottom: 12}}>
                        <IoInformationCircleOutline color={'grey'}/>
                        <div style={{fontSize: 'xx-small', color: 'grey'}}>Items availability and prices are not guaranteed until payment is done</div>
                    </div>
                    <div className="price-item">
                        <div>Normal total:</div>
                        <div style={{textDecoration: 'line-through', color: 'grey'}}>UGX {discount?.toLocaleString()}</div>
                    </div>
                    <div className="price-item">
                        <div>Discounted total:</div>
                        <div style={{color: 'orangered', fontWeight: '300'}}>UGX {(tPrice)?.toLocaleString()}</div>
                    </div>

                    <div className="price-item" style={{ fontWeight: '300', borderTop: '2px solid rgba(0,0,0,0.0)',}}>
                        <div>Subtotal({totalItems}):</div>
                        <div style={{color: '', fontWeight: '300'}}>UGX {tPrice?.toLocaleString()}</div>
                    </div>

                    <div className="price-item" style={{ fontWeight: '300', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: 16, paddingTop: 12}}>
                        <div>Shipping:</div>
                        <div style={{color: '', fontWeight: '700', color: 'green'}}>{'FREE'}</div>
                    </div>
                    <div style={{fontSize: 'x-small', color: 'grey'}}>Delivery: 1-2 Days</div>

                    <div className="price-item" style={{ fontWeight: '500', padding: '8px', boxShadow: '0px 0px 3px 1px rgba(255,69,0,0.9)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)', marginTop: 20}}>
                        <div>Order total:</div>
                        <div style={{color: 'rgba(0,0,0,0.7)', fontWeight: '600'}}>UGX {tPrice?.toLocaleString()}</div>
                    </div>
                    
                    <div className="submit-button"
                        onClick={ handleConfirmOrder }>
                            <div>Submit Order</div>
                    </div>

                    <div style={{display: 'flex', gap: 8}}>
                        <IoInformationCircleOutline color={'grey'}/>
                        <div style={{fontSize: 'xx-small', color: 'grey'}}>Items availability and prices are not guaranteed until payment is done</div>
                    </div>
                </div>

            </div>
            <div style={{marginTop: 100}}>
                <Footer/>
            </div>
        </div>
    )
}