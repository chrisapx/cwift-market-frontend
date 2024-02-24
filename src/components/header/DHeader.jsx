import { FaGift, FaThumbsUp } from 'react-icons/fa';
import './DHeader.scss'
import { MdLiveHelp, MdRateReview, MdSupportAgent } from 'react-icons/md';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
const DHeader = () => {

    const [hoovered, setHoovered] = useState('');
    const { totalItems } = useCart();
    const navigate = useNavigate();

    return(
        <div className="d-header-frame">
            <div className="logo" onClick={() => navigate('/')}>
                NALMART
            </div>

            <div className='page-overlay'></div>

            <div className='d-header-item'>
                <FaThumbsUp />
                <span style={{marginLeft: 5, }}>Best Sellers</span>
            </div>

            <div className='d-header-item'>
                <MdRateReview />
                <span style={{marginLeft: 5, }}>5-Star Rated</span>
            </div>

            <div className='d-header-item'>
                <FaGift />
                <span style={{marginLeft: 5, }}>Gift Offers</span>
            </div>

            <div className='d-header-item' onClick={() => navigate('/listings/NewArrivals')}>
                {/* <MdNewReleases /> */}
                <span style={{marginLeft: 5, }}>New arrivals</span>
            </div>

            <div className='d-header-item'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{marginLeft: 5, marginRight: 3}}>Categories</div>
                    {hoovered === 'categories' ? <IoChevronUpOutline /> : <IoChevronDownOutline /> }
                </div>
                
                <div className="dropdown-content">
                    <p>Hello World!</p>
                    <div>This is testing </div>
                </div>

            </div>

            <div className='d-header-item-search'>
                <input type='search' placeholder='Search...' style={{ display: 'flex', flex: 1,color: 'grey', height: '100%', borderBottomLeftRadius: 30, borderTopLeftRadius: 30, borderStyle: 'none', backgroundColor: 'white', paddingInline: 10, }} />
                <span style={{}} className='s-button'>
                    <HiSearch color={'white'} size={20}/>
                </span>
            </div>

            <div className='d-header-item' style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: 30, height: 30, borderRadius: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'goldenrod'}}>
                    {/* CM */}
                    <img src='src/assets/Chris_passport_us.jpeg'width={'100%'} height={'100%'} style={{objectFit: 'contain', borderRadius: 40}}/>
                </div>
                <div style={{marginLeft: 8, lineHeight: 1.1}}>
                    <div style={{fontWeight: 400, }}>Hello Chris</div>
                    <span style={{fontWeight: 600, }}>Orders & Account</span>
                </div>
            </div>

            <div className='d-header-item' style={{display: 'flex', alignItems: 'center'}}>
                <MdLiveHelp size={24} />
                <div style={{marginLeft: 5, fontSize: 14, fontWeight: '600'}}>Support</div>
            </div>

            <div className='d-header-item' style={{display: 'flex', alignItems: 'center'}}>
                <div style={{
                    width: 20, 
                    height: 20, 
                    borderRadius: 40, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: 'grey'
                    }}> U </div>                
                <div style={{marginLeft: 5, fontSize: 12, fontWeight: '600'}}>UG</div>
            </div>

            <div className='d-header-item' style={{display: 'flex'}}>
                <PiShoppingCartSimple size={22} />
                <div style={{position: 'relative', right: 10, color: 'white', backgroundColor: 'orange', borderRadius: 30, paddingInline: 4, fontWeight: '700', fontSize: 8, height: 12}}>{totalItems}</div>
            </div>
            
            {/* Cart for Desktop screens */}
            <div>
                
            </div>
            
        </div>
    )
}

export default DHeader;