import { useState } from 'react';
import './Header.scss'
import { FaBars, FaMoneyBill, FaRegUser, FaSearch } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaAngleLeft, FaX } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { MdOutlineRateReview, MdOutdoorGrill, MdOutlineSportsGymnastics, MdOutlineSell } from "react-icons/md";
import { RiCoupon4Line } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineInboxIn } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { GiHealthPotion, GiClothes } from "react-icons/gi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { SiPcgamingwiki } from "react-icons/si";




const Header = ({ showBack, showSearch }) => {

    const navigate = useNavigate();
    const { totalItems } = useCart();
    const [toggle, setToggle] = useState(false);

    return(
        <div className="main" >
            
            <div className="left">
                {showBack && <div className='back-icon'>
                    <FaAngleLeft size={20} color={'grey'} onClick={() => navigate(-1)}/>
                </div>}
                <div className='menu-item' onClick={() => setToggle(!toggle)}>
                    <FaBars size={18} color={'grey'}/>
                </div>
                <div className='logo' style={{fontSize: 20, fontWeight: '600', color: "grey", display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => navigate('/')}>
                    <img src='/src/assets/cwift.png' height={16} width={80}/>
                    <span className='menu-item' style={{marginLeft: 2, height: 16, width: 'auto', backgroundColor: 'white', borderRadius: 50}}><img src='/src/assets/cwift-logo.png' width={'100%'} height={'100%'}/></span>
                </div>
            </div>

            <div className="right">
                {showSearch && <div className='menu-item'  onClick={() => navigate('/search')}>
                    <FaSearch size={20} color={'grey'}/>
                </div>}
                <div className='menu-item' onClick={() => navigate('/account')}>
                    <FaRegUser size={20} />
                    <div style={{position: 'relative', bottom: 4, right: 3, color: 'red', backgroundColor: '', borderRadius: 30, padding: 2, fontWeight: '600', fontSize: 16}}>?</div>
                </div>
                <div className='menu-item' onClick={() => navigate('/cart')}>
                    <MdOutlineShoppingCart size={20} />
                    <div style={{position: 'relative', bottom: 9, right: 12, color: 'white', backgroundColor: 'orange', borderRadius: 30, padding: 2, fontWeight: '700', fontSize: 8}}>{totalItems}</div>
                </div>
            </div>

            {/* Drawer items */}
            {toggle && 
            <div className='drawer-region'>
                <div className="drawer" onTouchOutCapture={() => setToggle(false)}>
                    <div style={{color: 'grey', fontSize: 20, display: 'flex', alignItems: 'center', paddingBlock: 20}}>
                        {/* <div style={{color: 'red', fontSize: 24, fontWeight: '600' }}>Cwift</div> */}
                        <FaX size={16} color={'black'} onClick={() => setToggle(false)} style={{fontWeight: '900'}}/>
                        <img src='/src/assets/cwift.png' height={16} width={80} style={{marginLeft: 15}} />
                    </div>
                    <div className='drawer-items'>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4}}>
                            <div style={{fontSize: 10}}>NEED HELP?</div>
                            <IoIosArrowForward color={'grey'}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4}}
                            onClick={() => navigate('/account')}>
                            <div style={{fontSize: 10}}>MY CWIFT ACCOUNT</div>
                            <IoIosArrowForward color={'grey'}/>
                        </div>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <HiOutlineInboxIn size={22} color={'grey'}/></span> Inbox</p>
                        
                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <MdOutlineRateReview size={22} color={'grey'}/></span> Pending Reviews</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <RiCoupon4Line size={22} color={'grey'}/></span> Vouchers</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <LuShoppingBag size={22} color={'grey'}/></span> Orders</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <FaRegHeart size={22} color={'grey'}/></span> Saved Items</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <FaMoneyBill size={22} color={'grey'}/></span> CwiftPay Balance</p>

                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4}}>
                            <div style={{fontSize: 10}}>ITEM CATEGORIES</div>
                            <div style={{fontSize: 10, color: 'orange'}}>See All</div>
                        </div>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <IoPhonePortraitOutline size={22} color={'grey'}/></span>Phones & Tablets</p>
                        
                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <RiHomeOfficeLine size={22} color={'grey'}/></span> Home & Office</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <PiTelevisionSimpleBold size={22} color={'grey'}/></span> Electronics</p>
                        
                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <GiHealthPotion size={22} color={'grey'}/></span> Health & Beauty</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <GiClothes size={22} color={'grey'}/></span> Fashion</p>
                        
                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <HiOutlineComputerDesktop size={22} color={'grey'}/></span> Computing</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <MdOutlineSportsGymnastics size={22} color={'grey'}/></span> Sporting Goods</p>
                        
                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <MdOutdoorGrill size={22} color={'grey'}/></span> Garden & Outdoor</p>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 10}}> <SiPcgamingwiki size={22} color={'grey'}/></span> Gaming</p>
                        
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopStyle: 'solid', borderBottomStyle: 'solid', borderWidth: 0, borderColor: 'light-grey', paddingBlock: 4}}>
                            <div style={{fontSize: 10}}>MORE SERVICES</div>
                            <div style={{fontSize: 10, color: 'orange'}}>Explore</div>
                        </div>

                        <p style={{fontSize: 14, display: 'flex', alignItems: 'center'}} onClick={() => navigate('/add-item')}><span style={{marginRight: 10}}> <MdOutlineSell size={22} color={'grey'}/></span> Sell on Cwift</p>





                    </div>
                </div>
            </div>
            } 

        </div>
    )
}

export default Header;