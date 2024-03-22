import { FaGift, FaThumbsUp } from 'react-icons/fa';
import './DHeader.scss'
import { MdLiveHelp, MdRateReview } from 'react-icons/md';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { HiChevronRight, HiSearch } from 'react-icons/hi';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { useListing } from '../../context/ListingContext';
import { Avatar, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
const DHeader = () => {

    const [ hoovered, setHoovered] = useState('');
    const [ subCats, setSubCats] = useState('');
    const { totalItems } = useCart();
    const { dispatch } = useValue();
    const [ searchInput, setSearchinput ] = useState('');
    const { addToSearchHistory, getSearchHistory } = useListing();
    const [searchHistory, setSearchHistory] = useState([]);
    const [ currentUser, setCurrentUser ] = useState('chris');
    const navigate = useNavigate();

    const handleHover = (item) => {
        if(hoovered) {
            setHoovered('');
            setHoovered(item);
        }else setHoovered(item);
    }

    const categories = [
        { 
            name: "Electronics", 
            subCategories: [
                {name: 'Lighting', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flighting.jpeg57e8c991-b2f3-4dc8-b493-6eff339937a1?alt=media&token=dbf37ac9-6308-414a-8630-6e02f7055bc2'},
                {name: 'Headphones, EarBuds & Accessories ', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fh%26ebuds.jpeg6fe4d50a-cb95-4f5d-b840-d0c4f119dab1?alt=media&token=b7dcd69a-aa28-4183-9ec3-461fadda463e'},
                {name: 'Camera & Photo', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcamera%26photo.jpegc2ff6931-8d31-4aa8-8190-140ac6a178cf?alt=media&token=75ca5891-d1a8-4a65-9c58-d2c6f33319b8'},
                {name: 'Audio & Radio', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fo%26radio.jpeg802de16c-0c95-4c3b-9b21-47d97d2f5b99?alt=media&token=29274414-6f44-44f9-88a9-90ec479903fd'},
                {name: 'Phones & Tablets', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fphones%26tablets.jpege11f25e3-1ece-464c-9ea2-63aebaf997ef?alt=media&token=4d8d3500-2a20-4d64-bacf-f83c7d4e5d37'},
                {name: 'Laptops', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flaptops.jpeg72efff1c-1047-4d8f-aac5-844d1acd8622?alt=media&token=0f5cad92-0a3a-41b5-b066-ce3431243b91'},
                {name: 'Data Storage', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fdatastorage.jpeg1ecaabce-4d5a-4803-a93d-ad4448f338ff?alt=media&token=10fb62e6-3a22-45af-a648-dfc31c0be1d8'},
                {name: 'keyboards, Mice & Accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fkeybord%26mice.jpeg2712e463-b8c2-456e-a314-014f1adb47c7?alt=media&token=536b73bd-479d-4d95-b0e0-e2780e3f480f'},
                {name: 'Video Games', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fvideogames.jpegc8b30ba4-ee4a-405f-b4a8-9c463aff6a8e?alt=media&token=9af682e2-5029-49f9-a817-873273844023'},
                {name: 'Hubs & Adapters', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fhubd%26adapters.jpegdca98b95-8dbe-4f14-8064-f5db139c20ca?alt=media&token=fbec11d9-ed01-43db-9ba7-4546524055a5'},
                {name: 'Computer accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcomputing.jpeg4eb42784-1576-4346-89d3-0f7c243d27d7?alt=media&token=dfe12355-fdd0-442b-8690-51cdd33d539d'},
                {name: 'Batteries & Accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fbattery.jpegfd2e6ca5-aaec-48f4-a242-6cdd2496e668?alt=media&token=1378a309-80ea-42ea-a9ee-647f3f4e972f'},
                {name: 'USB Gadgets', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fusbgadets.jpeg3ac2767d-b0ed-4218-8e0b-a250548a59ef?alt=media&token=7269fe11-f6d4-4e9d-8a0b-afc05c705a72'},
                {name: 'power Strips', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2FpowerStrips.jpeg3380279e-d7bc-44ad-b915-4a549b864b3e?alt=media&token=0083bba6-c589-4032-b92d-e38b0f9094ad'},
            ]
        },
        {
            name: "Fashion",
            subCategories: [
                {name: "Mens Clothings", image: ""}
            ]
        }

    ]

    const handleKeyDown = ( event ) => {
        if(event.key === 'Enter'){
            addToSearchHistory(searchInput);
            navigate('/_sr/' + searchInput);
        }
    }

    useEffect(() => {
        setSearchHistory(getSearchHistory());
        setSubCats(categories.reduce(e => e.name === hoovered));
        console.log(subCats);
        setHoovered('')
    },[searchInput])

    const handleAuth = (type) => { // Return a function
        if(type === 'login'){
            dispatch({type: 'OPEN_LOGIN'})
            // dispatch the login page
        } else {
            dispatch({type: 'OPEN_LOGIN'})
            // dispatch the register window
        }
    }
    

    return(
        <div className="d-header-frame">
            <Link className="logo" to={'/'}> NALMART </Link>

            <div className='page-overlay'></div>

            <Link to={'/'} className='d-header-item'>
                <FaThumbsUp />
                <span style={{marginLeft: 5, }}>Best Sellers</span>
            </Link>

            <Link className='d-header-item' to={'/listings/NewArrivals'}>
                {/* <MdNewReleases /> */}
                <span style={{marginLeft: 5, }}>New arrivals</span>
            </Link>

            <div className='d-header-item'>
                <div style={{display: 'flex', alignItems: 'center'}} onMouseOver={() => handleHover('categories')} onMouseOut={() => handleHover('')}>
                    <div style={{marginLeft: 2, marginRight: 1}}>Categories</div>
                    {hoovered === 'categories' ? <IoChevronUpOutline /> : <IoChevronDownOutline /> }
                </div>
                
                {/* <div className="dropdown-content">
                    
                    <div className='d-content'>

                        <div className='d-content-1'>
                            {categories?.map((cat, index) => {
                                return (
                                    <div key={index} className='c-name' onMouseOver={() => setHoovered(cat?.name)}>
                                        <div style={{lineHeight: 2, fontSize: 'smaller'}}>{cat?.name}</div>
                                        <HiChevronRight color={'#cacaca'}/>
                                    </div>
                                )}
                            )}
                        </div>
                        <div className='c-subs' >
                            {subCats?.subCategories?.map((cat, index) => (
                                <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 100,}}>
                                    <div style={{height: 80, width: 80, borderRadius: 50, backgroundColor: 'greenyellow'}}></div>
                                    <div>{cat?.name}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div> */}

            </div>

            <div className='d-header-item-search'>
                <input 
                    type='search' 
                    placeholder='Search...' 
                    onKeyDown={handleKeyDown}
                    // onMouseOut={() => setHoovered('')}
                    onChange={e => setSearchinput(e.target.value)}
                    onFocus={() => setHoovered('search')} 
                    style={{ display: 'flex', flex: 1,color: 'grey', height: '100%', borderBottomLeftRadius: 30, borderTopLeftRadius: 30, borderStyle: 'none', backgroundColor: 'white', paddingInline: 10, }} />
                <span style={{}} className='s-button' onClick={() => navigate('/_sr/' + searchInput)}>
                    <HiSearch color={'white'} size={20}/>
                </span>

                <div className="dropdown-content" style={{display: hoovered === 'search' ? 'block' : 'none'}}>
                    
                    <div className='d-content'>
                        <Close sx={{
                            position: 'absolute',
                            right: 6,
                            top: 6,
                            cursor: 'pointer'
                        }}
                        onClick={() => setHoovered('')}/>
                        {/* <h4>Categories</h4> */}

                        <h4 className='txt1-header'>Recent</h4>
                        <div className='d-content-2'>
                            {searchHistory?.map((item, index) => (
                                <div key={index} className='txt2-body' onClick={() => {setHoovered(''); navigate('/_sr/' +item)}}>{item}</div>
                            ))}
                            {/* <div className='txt2-body' onClick={() => {setHoovered(''); navigate('/search-results/Lenovo thinkpad')}}>Lenovo thinkpad</div> */}
                        </div>
                        <h4 className='txt1-header'>Popular right now</h4>
                        <div className='d-content-2'>

                            <div className='txt2-body' onClick={() => {setHoovered(''); navigate('/_sr/Pearlight')}}>Pearlight</div>
                            <div className='txt2-body' onClick={() => {setHoovered(''); navigate('/_sr/Oraimo')}}>Oraimo</div>
                            <div className='txt2-body' onClick={() => {setHoovered(''); navigate('/_sr/Airpods')}}>Airpods</div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='d-header-item' style={{display: 'flex', alignItems: 'center'}}>
                <Link to={'/login'} style={{width: 30, height: 30, borderRadius: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', color: 'black'}}>
                    <Avatar/>
                </Link>
                
                {!currentUser ? <Link to={'/account'} style={{marginLeft: 8, lineHeight: 1.1, textDecoration: 'none', color: 'black'}}>
                    <div style={{fontWeight: 400, }}>Hello Chris</div>
                    <span style={{fontWeight: 600, }}>Orders & Account</span>
                </Link>: 
                
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    // flexDirection: 'column',
                    ml:2,
                    // lineHeight: 1.1,
                }}>
                    <Box sx={{color:'blue'}} onClick={() => handleAuth('login')}>Login</Box>
                    <div>|</div>
                    <Box sx={{color:'blue'}} onClick={() => handleAuth('register')}>Register</Box>
                </Box>}

            </div>

            <Link to={'/cart'} className='d-header-item' style={{display: 'flex'}} onClick={() => navigate('/cart')}>
                <PiShoppingCartSimple size={22} />
                <div style={{position: 'relative', right: 10, color: 'white', backgroundColor: 'orange', borderRadius: 30, paddingInline: 4, fontWeight: '700', fontSize: 8, height: 12}}>{totalItems}</div>
            </Link>
            
            {/* Cart for Desktop screens */}
            <div>
                
            </div>
            
        </div>
    )
}

export default DHeader;