import { useState } from 'react';
import './Header.scss'
import { FaBars, FaRegUser, FaSearch } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaAngleLeft, FaX } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Header = ({ showBack, showSearch }) => {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    return(
        <div className="main" >
            
            <div className="left">
                {showBack && <div className='menu-item'>
                    <FaAngleLeft size={26} color={'grey'} onClick={() => navigate(-1)}/>
                </div>}
                <div className='menu-item' onClick={() => setToggle(!toggle)}>
                    <FaBars size={18} color={'grey'}/>
                </div>
                <div className='logo' style={{fontSize: 24, fontWeight: '600', color: "grey", display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => navigate('/')}>
                    Cwift
                    <span style={{marginLeft: 4, height: 'auto', width: 20}}><img src='src/assets/logo.png' width={'100%'}/></span>
                </div>
            </div>

            <div className="right">
                {showSearch && <div className='menu-item'  onClick={() => navigate('/search')}>
                    <FaSearch size={20} color={'grey'}/>
                </div>}
                <div className='menu-item' onClick={() => navigate('/account')}>
                    <FaRegUser size={20} />
                </div>
                <div className='menu-item' onClick={() => navigate('/cart')}>
                    <MdOutlineShoppingCart size={20} />
                    <div style={{position: 'relative', bottom: 9, right: 12, color: 'white', backgroundColor: 'orange', borderRadius: 30, padding: 2, fontWeight: '700', fontSize: 8}}>22</div>
                </div>
            </div>

            {/* Drawer items */}
            {toggle && 
            <div className='drawer-region'>
                <div className="drawer" onTouchOutCapture={() => setToggle(false)}>
                    <div style={{color: 'grey', fontSize: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{color: 'red', fontSize: 24, fontWeight: '600' }}>Cwift</div>
                        <FaX onClick={() => setToggle(false)} />
                    </div>
                    {/* <div className='drawer-items'> */}
                        <p>Home Appliances</p>
                        <p>Office Appliances</p>
                        <p>Kitchen Appliances</p>
                        <p>Outdoor Appliances</p>
                        <p>Phones and Tablets</p>
                        <p>Desktops and Laptops</p>
                        <p>Home Appliances</p>
                        <p>Office Appliances</p>
                        <p>Kitchen Appliances</p>
                        <p>Outdoor Appliances</p>
                        <p>Phones and Tablets</p>
                        <p>Desktops and Laptops</p>
                        <p>Home Appliances</p>
                        <p>Office Appliances</p>
                        <p>Kitchen Appliances</p>
                        <p>Outdoor Appliances</p>
                        <p>Phones and Tablets</p>
                        <p>Desktops and Laptops</p>
                        <p>Home Appliances</p>
                        <p>Office Appliances</p>
                        <p>Kitchen Appliances</p>
                        <p>Outdoor Appliances</p>
                        <p>Phones and Tablets</p>
                        <p>Desktops and Laptops</p>
                        <p>Home Appliances</p>
                        <p>Office Appliances</p>
                        <p>Kitchen Appliances</p>
                        <p>Outdoor Appliances</p>
                        <p>Phones and Tablets</p>
                        <p>Desktops and Laptops</p>
                    {/* </div> */}
                </div>
            </div>
            } 

        </div>
    )
}

export default Header;