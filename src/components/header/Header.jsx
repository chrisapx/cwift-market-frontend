import { useState } from 'react';
import './Header.scss'
import { FaBars, FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";


const Header = () => {
    const [toggle, setToggle] = useState(false);
    return(
        <div className="main" >
            
            <div className="left">
                <div className='menu-item' onClick={() => setToggle(!toggle)}>
                    <FaBars size={18} color={'grey'}/>
                </div>
                <div className='logo' style={{fontSize: 24, fontWeight: '600', color: "#fb4444", display: 'flex', justifyItems: 'center'}}>
                    Cwift
                </div>
            </div>

            <div className="right">
                <div className='menu-item'>
                    <FaRegUser size={20}/>
                </div>
                <div className='menu-item'>
                    <MdOutlineShoppingCart size={20}/>
                    <div style={{position: 'relative', bottom: 13, right: 12, color: 'orange', fontWeight: '700', fontSize: 12}}>2</div>
                </div>
            </div>

            {/* Drawer items */}
            {/* {toggle &&  */}
                <div className={`drawer ${toggle? 'open' : ''}`} >
                    <p>Home Appliances</p>
                    <p>Office Appliances</p>
                    <p>Kitchen Appliances</p>
                    <p>Outdoor Appliances</p>
                    <p>Phones and Tablets</p>
                    <p>Desktops and Laptops</p>

                </div>
            {/* } */}

        </div>
    )
}

export default Header;