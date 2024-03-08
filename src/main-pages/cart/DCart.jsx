import React, { useEffect, useState } from "react";
import Footer from "../../components/d-footer/Footer";
import DHeader from "../../components/header/DHeader";
import './DCart.scss'
import { PiListBullets, PiTrashSimpleLight } from "react-icons/pi";
import { BsCheckCircleFill } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function DCart () {

    const { 
        cart,
        totalItems,
        totalDiscount,
        favorites, 
        totalPrice, 
        getItemQuantity, 
        addToCart, 
        reduceCart,
        incrementCart, 
        removeFromCart,
        addToFavorites,
        removeFromFavorites
     } = useCart();
    const navigate = useNavigate();
    const [ tPrice, setTPrice ] = useState();
    const [ discount, setDiscount ] = useState();
    const [ deliveryFee, setDeliveryFee] = useState(3600);
    const [ checkoutItems, setCheckoutItems ] = useState([]);

    useEffect(() => {
        // Calculate total price based on the items in the cart
        const totalPrice = cart.reduce((acc, order) => acc + (order.item.price * getItemQuantity(order.item)), 0);
        const disc = cart.reduce((acc, order) => acc + (order.item.globalPrice * getItemQuantity(order.item)), 0);
        setTPrice(totalPrice);
        setDiscount(disc);
    }, [cart, discount, totalItems]);

    useEffect(() => {
        document.title = "Checkout | " + totalItems + " Items";
        // document.description = item.description;

    },[])
    

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

            <div className="d-cart-body">
                <div className="cb-left">
                    <div className="left-header">
                        <div style={{display: "flex", gap: 16, alignItems: "center"}}>
                            {/* <BsCheckCircle/> */}
                            <BsCheckCircleFill size={20}/>
                            <div style={{fontWeight: '600', fontSize: 16}}>Select all ({totalItems})</div>
                        </div>
                        <PiListBullets size={24}/>
                    </div>

                    <div className="cart-items-container">
                        
                        { totalItems != 0 ? cart?.map((citem, index) => {
                            const quantity = getItemQuantity(citem?.item); 

                        
                        return (
                            <div key={index} className="cart-item-card">
                                <div className="select-section">
                                    <BsCheckCircleFill size={20}/>
                                    {/*#fff <BsCheckCircle/> */}
                                </div>
                                <div className="img-container">
                                    <img src={citem?.item.coverPhoto?.url} height={'100%'} width={'100%'} style={{objectFit: 'contain'}}/>
                                    {/* <img src="src/assets/Laptop.png" height={'100%'} width={'100%'} style={{objectFit: 'contain'}}/> */}
                                </div>
                                <div className="details-container">
                                    <div className="name-n-del">
                                        <div style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>
                                            {citem?.item?.name}
                                        </div>
                                        <PiTrashSimpleLight size={24} style={{marginLeft: 12, cursor: 'pointer' }} onClick={() => removeFromCart(citem?.item?.itemID)}/>
                                    </div>

                                    <div className="store-n-price">
                                        <div style={{color: 'green', fontSize: 'smaller'}}><span style={{color: 'grey'}}>By</span> {citem?.item?.store}</div>
                                        <div style={{fontWeight: 'bold', fontSize: 'small'}}>UGX {citem?.item?.price?.toLocaleString()}</div>
                                    </div>

                                    <div className="discount-sec">
                                        <div style={{color: 'green', fontSize: 'smaller'}}>{""}</div>
                                        <div style={{textDecoration: 'line-through', fontWeight: '500', color: 'grey', fontSize: 'smaller', }}>UGX {citem?.item?.globalPrice?.toLocaleString()}</div>
                                    </div>

                                    <div className='three-btns'>
                                        <div className='itm-btn' style={{backgroundColor: quantity <= 1 ? 'rgba(255, 69, 0, 0.2)' : 'orangered'}} onClick={() => quantity > 0 && reduceCart(citem?.item)}>-</div>
                                        <div className='count'>{quantity}</div>
                                        <div className='itm-btn' onClick={() => incrementCart(citem?.item)}>+</div>
                                    </div>

                                </div>
                            </div>
                        )}) : (<div style={{color: 'white'}}>Ttems In Cart</div>)
                        }
                    </div>

                    
                </div>
                <div className="cb-right">
                    <div className="right-header">Order summery</div>
                    <div className="price-item">
                        <div>Normal total:</div>
                        <div style={{textDecoration: 'line-through', color: 'grey'}}>UGX {discount?.toLocaleString()}</div>
                    </div>
                    <div className="price-item">
                        <div>Discounted total:</div>
                        <div style={{color: 'orangered', fontWeight: '500'}}>UGX {(tPrice)?.toLocaleString()}</div>
                    </div>

                    <div className="price-item" style={{ fontWeight: '500', borderTop: '2px solid rgba(0,0,0,0.1)', marginTop: 16, paddingTop: 12}}>
                        <div>Checkout Total({totalItems}):</div>
                        <div style={{color: '', fontWeight: '500'}}>UGX {tPrice?.toLocaleString()}</div>
                    </div>

                    <div 
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBlock: 20, fontSize: 14, fontWeight: '600', color: 'whitesmoke', backgroundColor: 'rgb(255, 69, 0, 0.9)', cursor: 'pointer', padding: 12, borderRadius: 6}}
                        onClick={() => navigate('/checkout/' + tPrice)}
                        >
                        {tPrice <= 5000 ? <div>Shop 5,000 Min. to Checkout</div> : <div>Checkout({tPrice?.toLocaleString()})</div>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBlock: 20, fontSize: 14, fontWeight: '600', color: 'black', border: '1px rgba(0,0,0,0.3) solid', cursor: 'pointer', padding: 12, borderRadius: 6}}>Express checkout with <span style={{color: "rgba(0,0,233,0.7)", marginLeft: 5}}> NPay</span></div>

                    <div style={{display: 'flex', gap: 8}}>
                        <IoInformationCircleOutline color={'grey'}/>
                        <div style={{fontSize: 'xx-small', color: 'grey'}}>Items availability and prices are not guaranteed until payment is done</div>
                    </div>
                </div>

            </div>
            <div style={{marginTop: 100}}>
                <Footer/>
            </div>

            {/* <div className='checkout-cart' onClick={{}}>
                <div style={{backgroundColor: 'orange', borderRadius: 3, width: '100%', marginInline: 10, cursor: 'pointer'}} className='inner-item' onClick={{}}>CHECKOUT (UGX {(2344000).toLocaleString() })</div>
            </div> */}
        </div>
    )
}