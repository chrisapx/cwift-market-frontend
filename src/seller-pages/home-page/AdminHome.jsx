import { FaBackward } from 'react-icons/fa';
import './AdminHome.scss'
import { TbCashBanknote, TbChecklist, TbChevronDown, TbChevronUp, TbListDetails, TbSpeakerphone, TbTag } from "react-icons/tb";
import { useState } from 'react';
import Orders from '../../seller-components/view-orders/Orders';
import AddProduct from '../../seller-components/add-product/AddProduct';
import ManageProducts from '../../seller-components/manage-products/ManageProducts';
import Promotions from '../../seller-components/promotions/Promotions';
import Fullfilment from '../../seller-components/fullfilment/Fullfilment';
import Advertise from '../../seller-components/advertise/Advertise';
import AccountStatement from '../../seller-components/account-statement/AccountStatement';
import { Avatar } from '@mui/material';


export default function AdminHome () {

    const [selected, setSelected] = useState('manage-products');
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
        <div className="admin-frame">

            <title>Vendor Hub | Nalmart</title>

            {/* Lable section / Drawer section */}
            <div className='drawer-frame'>
                
                <div className='drawer-header'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src='src/assets/cwift-logo.png' height={50}/>
                        <span style={{color: 'orange', fontWeight: '800', marginLeft: 14}}>VENDOR </span><span style={{color: 'orange',marginLeft: 4, fontWeight: '400'}}>HUB</span>
                    </div>
                    <FaBackward color={'grey'} style={{cursor: 'pointer'}}/>
                </div>

                <div className='drawer-body'>

                    <div className='drawer-item' style={{backgroundColor: selected == 'orders'? selectColor : ''}} onClick={() => select('orders')}>
                        <TbChecklist size={22} />
                        <span>Orders</span>
                    </div>


                    {/* Products sub section */}
                    <div className='drawer-item' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: selected == 'products'? selectColor : ''}} 
                    onClick={() => {   
                            setToggleprod(!toggleProd)
                        }}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                            <TbListDetails size={22} />
                            <span>Products</span>
                        </div>
                        {!toggleProd ? <TbChevronDown size={16}/> : <TbChevronUp size={16}/>}
                    </div>

                    {toggleProd && <div className='sub-drawer-item' style={{backgroundColor: selected == 'manage-products'? selectColor : ''}} onClick={() => select('manage-products')}>
                        <span>Manage products</span>
                    </div>}

                    {toggleProd && <div className='sub-drawer-item' style={{backgroundColor: selected == 'add-products'? selectColor : ''}} onClick={() => select('add-products')}>
                        <span>Add products</span>
                    </div>}

                    {toggleProd && <div className='sub-drawer-item' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: selected == 'fullfilment'? selectColor : ''}} onClick={() => {
                            setToggleFullfilment(!toggleFulfilment)
                        }}>
                        <span>Fullfilment by Nalmart</span>
                        {!toggleFulfilment ? <TbChevronDown size={16}/> : <TbChevronUp size={16}/>}
                    </div>}



                    <div className='drawer-item' style={{backgroundColor: selected == 'promotions'? selectColor : ''}} onClick={() => select('promotions')}>
                        <TbTag size={22} />
                        <span>Promotions</span>
                    </div>

                    <div className='drawer-item' style={{backgroundColor: selected == 'advertise'? selectColor : ''}} onClick={() => select('advertise')}>
                        <TbSpeakerphone size={22} />
                        <span>Advertise products</span>
                    </div>

                    <div className='drawer-item' style={{backgroundColor: selected == 'account-statement'? selectColor : ''}} onClick={() => select('account-statement')}>
                        <TbCashBanknote size={22} />
                        <span>Account statement</span>
                    </div>

                </div>
                <div className='drawer-footer'>
                    <Avatar src=''/>
                    <div className='footer-text'>
                        <div style={{fontSize: 14, fontWeight: '700', color: 'grey'}}>Chris</div>
                        <div style={{fontSize: 12, color: 'grey'}}>mcaplexya@gmail.com</div>
                    </div>
                </div>

            </div>

            {/* This is the main section */}
            <div className='main-section'>
                {selected === 'orders' && <Orders/>}
                {selected === 'products' && <ManageProducts/>}
                {selected === 'add-products' && <AddProduct/>}
                {selected === 'manage-products' && <ManageProducts/>}
                {selected === 'fullfilment' && <Fullfilment/>}
                {selected === 'promotions' && <Promotions/>}
                {selected === 'advertise' && <Advertise/>}
                {selected === 'account-statement' && <AccountStatement/>}
            </div>
        </div>
    )
}