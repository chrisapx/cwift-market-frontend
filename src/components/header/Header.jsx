import './Header.scss'
import { FaBars, FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";


const Header = () => {
    return(
        <div className="main" >
            
            <div className="left">
                <div className='menu-item'>
                    <FaBars size={20} color={'grey'}/>
                </div>
                <div className='logo' style={{fontSize: 24, fontWeight: '700'}}>
                    Cwift
                </div>
            </div>

            <div className="right">
                <div className='menu-item'>
                    <FaRegUser size={24}/>
                </div>
                <div className='menu-item'>
                    <MdOutlineShoppingCart size={24}/>
                    <div style={{position: 'absolute', top: 52, color: 'orange', fontWeight: '700', right: 36, fontSize: 12}}>2</div>
                </div>
            </div>

        </div>
    )
}

export default Header;