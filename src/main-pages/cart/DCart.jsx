import React, { useState } from "react";
import Footer from "../../components/d-footer/Footer";
import DHeader from "../../components/header/DHeader";
import './DCart.scss'
import { PiListBullets, PiTrashSimpleLight } from "react-icons/pi";
import { BsCheckCircleFill } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function DCart () {

    const { cartItems, totalItems } = useCart();
    const navigate = useNavigate();
    const [ checkoutItems, setCheckoutItems ] = useState([]);

    // const handleSelect = ( name ) => {
    //     if(checkoutItems?.contains(name)) setCheckoutItems([checkoutItems?.filter(e => e?.name !== name)]);
    //     else setCheckoutItems([...checkoutItems]); 
    // }

    return(
        <div className="d-cart-frame">
            <div className="d-cart-header">
                <DHeader/>
                <div className="dir-tracker">Home {">"} cart</div>
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
                        <div className="cart-item-card">
                            <div className="select-section">
                                <BsCheckCircleFill size={20}/>
                                {/*#fff <BsCheckCircle/> */}
                            </div>
                            <div className="img-container">
                                <img src="src/assets/Laptop.png" height={'100%'} width={'100%'} style={{objectFit: 'contain'}}/>
                            </div>
                            <div className="details-container">
                                <div className="name-n-del">
                                    <div style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>
                                        Computer Science, Electrical power, TV and
                                        radio Engineering, Telecommunications service provider, Internet service provider, Data science, Solar
                                        power, Manufacturing service industry,
                                    </div>
                                    <PiTrashSimpleLight size={24} style={{marginLeft: 12, }}/>
                                </div>
                            </div>
                        </div>

                        <div className="cart-item-card">
                            <div className="select-section">
                                <BsCheckCircleFill size={20}/>
                                {/*#fff <BsCheckCircle/> */}
                            </div>
                            <div className="img-container">
                                <img src="src/assets/Laptop.png" height={'100%'} width={'100%'} style={{objectFit: 'contain'}}/>
                            </div>
                            <div className="details-container">
                                <div className="name-n-del">
                                    <div style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>
                                        Computer Science, Electrical power, TV and
                                        radio Engineering, Telecommunications service provider, Internet service provider, Data science, Solar
                                        power, Manufacturing service industry,
                                    </div>
                                    <PiTrashSimpleLight size={24} style={{marginLeft: 12, }}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
                <div className="cb-right">
                    <div className="right-header">Order summery</div>
                    <div className="price-item">
                        <div>Items total:</div>
                        <div style={{textDecoration: 'line-through', color: 'grey'}}>UGX {(234444).toLocaleString()}</div>
                    </div>
                    <div className="price-item">
                        <div>Items discount:</div>
                        <div style={{color: 'orangered', fontWeight: '500'}}>- UGX {(154444).toLocaleString()}</div>
                    </div>

                    <div className="price-item" style={{ fontWeight: '500', borderTop: '2px solid rgba(0,0,0,0.1)', marginTop: 16, paddingTop: 12}}>
                        <div>Total({totalItems}):</div>
                        <div style={{color: '', fontWeight: '500'}}>UGX {(80000).toLocaleString()}</div>
                    </div>

                    <div 
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBlock: 20, fontSize: 14, fontWeight: '600', color: 'whitesmoke', backgroundColor: 'rgb(241, 112, 0)', cursor: 'pointer', padding: 12, borderRadius: 6}}
                        onClick={() => navigate('/checkout/' + 80000)}
                        >
                        5,000 Min. to Checkout
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBlock: 20, fontSize: 14, fontWeight: '600', color: 'black', border: '1px rgba(0,0,0,0.3) solid', cursor: 'pointer', padding: 12, borderRadius: 6}}>Express checkout with <span style={{color: "rgba(0,0,233,0.7)", marginLeft: 5}}> NPay</span></div>

                    <div style={{display: 'flex', gap: 8}}>
                        <IoInformationCircleOutline color={'grey'}/>
                        <div style={{fontSize: 'xx-small', color: 'grey'}}>Items availability and prices are not guaranteed until payment is done</div>
                    </div>
                </div>

            </div>
            <div style={{marginTop: 700}}>
                <Footer/>
            </div>

            {/* <div className='checkout-cart' onClick={{}}>
                <div style={{backgroundColor: 'orange', borderRadius: 3, width: '100%', marginInline: 10, cursor: 'pointer'}} className='inner-item' onClick={{}}>CHECKOUT (UGX {(2344000).toLocaleString() })</div>
            </div> */}
        </div>
    )
}