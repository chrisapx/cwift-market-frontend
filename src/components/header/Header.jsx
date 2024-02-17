import { useEffect, useState } from 'react';
import './Header.scss'
import { FaBars, FaChevronCircleRight, FaMoneyBill, FaRegUser, FaSearch } from 'react-icons/fa';
import { MdCommit, MdKey, MdOutlineShoppingCart, MdSecurity, MdVerified } from "react-icons/md";
import { FaAngleLeft, FaCartShopping, FaX } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { MdOutlineRateReview, MdOutdoorGrill, MdOutlineSportsGymnastics, MdOutlineSell } from "react-icons/md";
import { RiCoupon4Line, RiFontMono, RiFontSansSerif } from "react-icons/ri";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineInboxIn } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoCash, IoChevronForwardOutline, IoPhonePortraitOutline, IoPricetagSharp } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { PiLightning, PiLightningAFill, PiLightningFill, PiTelevisionSimpleBold } from "react-icons/pi";
import { GiHealthPotion, GiClothes, GiLightningArc } from "react-icons/gi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { SiPcgamingwiki } from "react-icons/si";
import Search from '../search/Search';




const Header = ({ showBack, showSearch }) => {

    const s_red = '#c83f49';

    const navigate = useNavigate();
    const { totalItems } = useCart();
    const [toggle, setToggle] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState('All');

    const handleSelected = ( select ) => {
        if(select){
            setSelected('');
            setSelected(select);
        }
    }

    const upperCat = [ 
        {name: "All", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'}, 
        {name: "Women", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
        {name: "Men", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
        {name: "Kids", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
        {name: "Jewelry", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
        {name: "Kitchen", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
        {name: "Home", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
        {name: "School", image: 'src/assets/Apple-iPhone-12-PNG-Pic.png'},
    ]
    return(
        <div className="main" >
            <div className='head'>
                <div className="left">
                    {showBack && <div className='back-icon'>
                        <FaAngleLeft size={22} color={'grey'} onClick={() => navigate(-1)}/>
                    </div>}
                    <div className='logo' style={{fontWeight: '600', cursor: 'pointer', marginRight: 0}} onClick={() => navigate('/')}>
                        <div style={{color: s_red, fontStyle: '-moz-initial', fontSize: 20}}>NALMART</div>
                    </div>
                </div>
                
                <div style={{display: 'flex', width: '5vw', justifyContent: 'center'}}>
                    <Search/>
                </div>

                <div className="right">
                    {/* {showSearch && <div className='menu-item'  onClick={() => navigate('/search')}>
                        <FaSearch size={22} color={'black'}/>
                    </div>} */}
                    <div className='menu-item' onClick={() => navigate('/account')}>
                        <FaRegUser size={22} />
                        {/* <div style={{position: 'relative', bottom: 4, right: 3, color: 'red', backgroundColor: '', borderRadius: 30, padding: 2, fontWeight: '600', fontSize: 16}}>?</div> */}
                    </div>
                    <div className='menu-item' onClick={() => navigate('/cart')}>
                        <FaCartShopping size={22} />
                        <div style={{position: 'relative', bottom: 9, right: 12, color: 'white', backgroundColor: 'orange', borderRadius: 30, padding: 2, fontWeight: '700', fontSize: 8}}>{totalItems}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

















{/* <div className='menu-item' onClick={() => setToggle(!toggle)}>
    <FaBars size={18} color={'grey'}/>
</div> */}




{/* Drawer items */}
{/* {toggle && 
    <div className='drawer-region'>
        <div className="drawer" onTouchOutCapture={() => setToggle(false)}>
            <div style={{color: 'grey', fontSize: 20, display: 'flex', alignItems: 'center', paddingBlock: 20}}>
                <FaX size={16} color={'black'} onClick={() => setToggle(false)} style={{fontWeight: '900'}}/>
                <img src='/src/assets/cwift.png' height={16} width={80} style={{marginLeft: 15}} />
            </div>
        </div>
    </div>
}  */}


{/* <div className='drawer-items'>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4, cursor: 'pointer'}}>
        <div style={{fontSize: 10, fontWeight: '600', color: 'grey'}}>NEED HELP?</div>
        <IoIosArrowForward color={'grey'}/>
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4, cursor: 'pointer'}}
        onClick={() => navigate('/account')}>
        <div style={{fontSize: 10, fontWeight: '600', color: 'grey'}}>MY CWIFT ACCOUNT</div>
        <IoIosArrowForward color={'grey'}/>
    </div>

    <p style={{fontSize: 12, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <HiOutlineInboxIn size={20} color={'grey'}/></span> Inbox</p>
    <p style={{fontSize: 12, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <MdOutlineRateReview size={20} color={'grey'}/></span> Pending Reviews</p>
    <p style={{fontSize: 12, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <RiCoupon4Line size={20} color={'grey'}/></span> Vouchers</p>
    <p style={{fontSize: 12, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <LuShoppingBag size={20} color={'grey'}/></span> Orders</p>
    <p style={{fontSize: 12, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <FaRegHeart size={20} color={'grey'}/></span> Saved Items</p>
    <p style={{fontSize: 12, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <FaMoneyBill size={20} color={'grey'}/></span> CwiftPay Balance</p>

    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4}}>
        <div style={{fontSize: 10, fontWeight: '600', color: 'grey'}}>ITEM CATEGORIES</div>
        <div style={{fontSize: 10, color: 'orange'}}>See All</div>
    </div>

    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <IoPhonePortraitOutline size={20} color={'grey'}/></span>Phones & Tablets</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <RiHomeOfficeLine size={20} color={'grey'}/></span> Home & Office</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <PiTelevisionSimpleBold size={20} color={'grey'}/></span> Electronics</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <GiHealthPotion size={20} color={'grey'}/></span> Health & Beauty</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <GiClothes size={20} color={'grey'}/></span> Fashion</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <HiOutlineComputerDesktop size={20} color={'grey'}/></span> Computing</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <MdOutlineSportsGymnastics size={20} color={'grey'}/></span> Sporting Goods</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <MdOutdoorGrill size={20} color={'grey'}/></span> Garden & Outdoor</p>
    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <SiPcgamingwiki size={20} color={'grey'}/></span> Gaming</p>
    
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4}}>
        <div style={{fontSize: 10}}>MORE SERVICES</div>
        <div style={{fontSize: 10, color: 'orange'}}>Explore</div>
    </div>

    <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}} onClick={() => navigate('/add-item')}><span style={{marginRight: 10}}> <MdOutlineSell size={22} color={'grey'}/></span> Sell on Cwift</p>





</div> */}