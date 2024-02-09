import { FaBackward } from 'react-icons/fa';
import './Signup.scss'
import { TbArrowDown, TbCashBanknote, TbChecklist, TbChevronDown, TbChevronUp, TbListDetails, TbSpeakerphone, TbTag } from "react-icons/tb";
import { useState } from 'react';


const Signup  = () => {

    const [selected, setSelected] = useState('');
    const [toggleProd, setToggleprod] = useState(false);
    const [toggleFulfilment, setToggleFullfilment] = useState(false);
    const selectColor = "#34cab980";

    const select = ( sel ) => {
        if(select){
            setSelected('');
            setSelected(sel);
        }
    }
    return(
        <div className="signup-frame">

            <title>Vendor Hub | Nalmart</title>

            {/* Lable section / Drawer section */}
            <div className='drawer-frame'>
                
                <div className='drawer-header'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src='src/assets/cwift-logo.png' height={50}/>
                        <span style={{color: 'black', fontWeight: '800', marginLeft: 14}}>VENDOR </span><span style={{color: 'black',marginLeft: 4, fontWeight: '400'}}>HUB</span>
                    </div>
                    <FaBackward color={'grey'} style={{cursor: 'pointer'}}/>
                </div>

                <div className='drawer-body'>

                    <div className='drawer-item' style={{backgroundColor: selected == 'orders'? selectColor : ''}} onClick={() => select('orders')}>
                        <TbChecklist size={24} />
                        <span>Orders</span>
                    </div>


                    {/* Products sub section */}
                    <div className='drawer-item' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: selected == 'prod'? selectColor : ''}} 
                    onClick={() => {   
                            select('prod') 
                            setToggleprod(!toggleProd)
                        }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                            <TbListDetails size={24} />
                            <span>Products</span>
                        </div>
                        {!toggleProd ? <TbChevronDown size={24}/> : <TbChevronUp size={24}/>}
                    </div>

                    {toggleProd && <div className='sub-drawer-item' style={{backgroundColor: selected == 'mngprod'? selectColor : ''}} onClick={() => select('mngprod')}>
                        <span>Manage products</span>
                    </div>}

                    {toggleProd && <div className='sub-drawer-item' style={{backgroundColor: selected == 'addprod'? selectColor : ''}} onClick={() => select('addprod')}>
                        <span>Add products</span>
                    </div>}

                    {toggleProd && <div className='sub-drawer-item' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: selected == 'fullf'? selectColor : ''}} onClick={() => {
                        select('fullf')
                        setToggleFullfilment(!toggleFulfilment)
                        }}>
                        <span>Fullfilment by Nalmart</span>
                        {!toggleFulfilment ? <TbChevronDown size={24}/> : <TbChevronUp size={24}/>}
                    </div>}



                    <div className='drawer-item' style={{backgroundColor: selected == 'promo'? selectColor : ''}} onClick={() => select('promo')}>
                        <TbTag size={24} />
                        <span>Promotions</span>
                    </div>

                    <div className='drawer-item' style={{backgroundColor: selected == 'ad'? selectColor : ''}} onClick={() => select('ad')}>
                        <TbSpeakerphone size={24} />
                        <span>Advertise products</span>
                    </div>

                    <div className='drawer-item' style={{backgroundColor: selected == 'accs'? selectColor : ''}} onClick={() => select('accs')}>
                        <TbCashBanknote size={24} />
                        <span>Account statement</span>
                    </div>

                </div>
                <div className='drawer-footer'>
                    <div className="footer-dp">
                        <img src='src/assets/Chris_passport_us.jpeg' height={'100%'}/>
                    </div>
                    <div className='footer-text'>
                        <div style={{fontSize: 14, fontWeight: '700', color: 'grey'}}>Chris</div>
                        <div style={{fontSize: 12, color: 'grey'}}>mcaplexya@gmail.com</div>
                    </div>
                </div>

            </div>

            {/* This is the main section */}
            <div className='main-frame'>
                <div className='tittle'>Orders Management</div>
                
                <div className='orders-filter'>
                    <div style={{color: 'orange', paddingBottom: 10, fontSize: 12, fontWeight: '600'}}>FILTERS</div>
                    
                    <div className='status-panel'>
                        <div className='order-status'>
                            <div style={{fontSize: 12, fontWeight: '700'}}>STATUS: </div>
                            <div className='status-item'>All</div>
                            <div className='status-item'>Pending</div>
                            <div className='status-item'>Confirmed</div>
                            <div className='status-item'>Picked</div>
                            <div className='status-item'>Shipped</div>
                            <div className='status-item'>Out for delivery</div>
                            <div className='status-item'>Delivered</div>
                            <div className='status-item'>Delivery failed</div>
                            <div className='status-item'>Cancelled</div>
                            <div className='status-item'>Received</div>
                            <div className='status-item'>Rated</div>
                        </div>
                        <div>
                            <div style={{color: 'grey', fontWeight: '600', fontSize: 16}}>
                                CURRENCY: <span style={{color: 'grey', fontWeight: '600', fontSize: 14}}>USD <input type='radio' checked={{}} color='orange'/></span> 
                                          <span style={{color: 'grey', fontWeight: '600', fontSize: 14}}>UGX <input type='radio'/></span> 
                            </div>
                        </div>
                    </div>
                    
                    {/* <form>
                        <label>Login</label>
                        <input type='date'/>
                    </form> */}

                    <div className='input-field'>
                        <input type='text' className='input'/>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Signup;