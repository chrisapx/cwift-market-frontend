import React, { useEffect, useState } from "react";
import './DSearchResults.scss';
import DHeader from "../../components/header/DHeader";
import StarRatings from "react-star-ratings";
import { useCart } from "../../context/CartContext";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useListing } from "../../context/ListingContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import Footer from "../../components/d-footer/Footer";
import Signing from "../../components/d-footer/Signing";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useValue } from "../../context/ContextProvider";
import { FilterNone } from "@mui/icons-material";
import { Box, Typography, Select, MenuItem } from '@mui/material';
import filterItems from "../../utils/SearchHelper";

export default function DSearchResults (){

    const [ addCart, setAddCart ] = useState(false);
    const [ minPrice, setMinPrice] = useState(0);
    const [ maxPrice, setMaxPrice] = useState(3000000);
    const [hovered, setHovered] = useState(false);
    const [error, setError] = useState(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const [sortBy, setSortBy] = useState('Select filter');

    const [ items, setItems] = useState([]);
    const { dispatch } = useValue();
    const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
    const { listing } = useListing();
    const { input } = useParams();
    const navigate = useNavigate();

    const handleHover = () => {
        setHovered(!hovered);
    };

    useEffect(() => {
        dispatch({ type: 'START_LOADING' });
        if(input === null) setItems(listing);
        else setItems(filterItems(listing, input));
        dispatch({ type: 'END_LOADING' });
    }, [input, listing])
    
    const subCats = [
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

    useEffect(() => {
        let intervalId;
        if (!hovered) {
            intervalId = setInterval(() => {
                setScrollIndex((prevIndex) => (prevIndex + 1) % (subCats.length * 2));
            }, 2000); // Adjust the interval as needed
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [hovered, subCats.length]);


    const handleAddToCart = ( item ) => {
        addToCart( item );
        setAddCart(true);
        setTimeout(() => {
          setAddCart(false)
        }, 2000)
      }

    return(
        <div className="d-listings-frame">
            <div style={{position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1}}>
                <DHeader/>
            </div>

            {/* Sub categories  */}
            <div className="s-cats-section" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                <BsChevronDoubleLeft color={'black'}/>
                {subCats?.map((sc, index) => (
                    <Link title={sc.name} to={'/listings/' + sc?.name} key={index} style={{ width: 100, textDecoration: 'none', display: 'flex', flexDirection: "column", alignItems: 'center', marginRight: 10, cursor: 'pointer' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#f7f7f7' }}>
                            <img src={sc?.image} alt="lighting" style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: '50%', }} />
                        </div>
                        <div style={{ color: "rgba(0,0,0,0.8)", fontSize: 12, fontWeight: '500', marginTop: 5, textAlign: 'center'}}>{sc?.name}</div>
                    </Link>

                ))}
            </div>

            <div className="main-body-section">

                <div className="listing-section">
                    <div className="filters">
                        <h1 id="f-header">Filters</h1>

                        <form id="filter-form">
                            
                            <div class="filter-option">
                                <h4>Minimum price</h4>
                                <input type="range" id="price-range" name="price" min={0} max={3000000} step={10} onChange={(p) => setMinPrice(p.target.value)} color="orange" style={{}}/>
                                <div id="price-value">{parseFloat(minPrice).toLocaleString()}</div>
                            </div>

                            <div class="filter-option">
                                <h4>Maximum price</h4>
                                <input type="range" id="price-range" name="price" min={0} max={3000000} step={10} onChange={(p) => setMaxPrice(p.target.value)}/>
                                <div id="price-value">UGX {parseFloat(maxPrice).toLocaleString('en-US')}</div>
                            </div>

                        </form>

                    </div>
                    <div className="i-section">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h1" id="i-header">Trending Items</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ color: 'black', marginRight: 1, }}>Sort by</Typography>
                            <Select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                sx={{ minWidth: '120px', height: '26px', '& .MuiSelect-select': { paddingLeft: '8px' } }}
                            >
                                <MenuItem value="Select filter">Select filter</MenuItem>
                                {/* Add other filter options as MenuItem components */}
                            </Select>
                        </Box>
                    </Box>
                        

                        { items.length > 0? 
                            (<div className="i-section-contents">
                            {items?.map((item, index) => {

                                const itemRating = item?.reviews.reduce((totalRate, review) => {
                                    if (review && review.rating !== undefined || review.rating != 0) return totalRate + review.rating;
                                    else return totalRate;
                                }, 0.0)

                                return(
                            <div key={index} className="i-card">
                                <Link className="i-card-image" to={'/details/' + item.itemID}
                                    // onClick={() => navigate('/details/' + item.itemID)}
                                    >
                                    <img src={item?.coverPhoto?.url} width={'100%'} height={'100%'} style={{objectFit: 'contain', borderRadius: 4}}/>
                                </Link>
                                <div className="i-info-section">
                                    <Link style={{textDecoration: 'none'}} to={'/details/' + item.itemID}>
                                    <p className="i-name" title={item.name}>{item?.name}</p>
                                    <p className="i-price">UGX {(item?.price).toLocaleString()} <span style={{marginLeft: 8, color: 'rgba(0,0,0,0.4)', fontSize: 12, textDecoration: 'line-through', fontWeight: 'normal'}}>UGX {(item?.globalPrice).toLocaleString()}</span></p>
                                    <div style={{color: 'rgba(0,0,0,0.5)', fontSize: 14, fontWeight: '400'}}>{item?.stockCount} sold</div>
                                    </Link>
                                    <div className="rating-n-cart">
                                        <div style={{fontSize: 12}}>
                                            <StarRatings
                                                rating={itemRating}
                                                starRatedColor="black"
                                                numberOfStars={5}
                                                starDimension="14px"
                                                starSpacing="0px"
                                                name='rating'
                                                />({item?.reviews?.length})
                                        </div>
                                        <div 
                                            title="Add item to cart"
                                            style={{
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center', 
                                            borderStyle: 'solid', 
                                            borderWidth: 1, 
                                            borderRadius: 14, 
                                            paddingInline: 10, 
                                            paddingBlock: 3, 
                                            marginRight: 4}}
                                            onClick={() => handleAddToCart(item)} 
                                            >
                                                <MdOutlineAddShoppingCart size={20}/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            )}
                            )}
                        </div>) :
                        (<div style={{color: 'black', display: "flex", alignItems: "center", gap: 16}}>
                            <FilterNone/>
                            <text>No Items available with those filters</text>
                            
                        </div>)
                        }

                    </div>
                    
                    
                </div>
            </div>


            <footer style={{}}>
                <div>
                    <Footer/>
                </div>
                <div>
                    <Signing/>
                </div>
            </footer>
            {addCart && 
                <div className='add-cart-notif'>
                    <TiTick size={20} />
                    <span>Item successfuly added to cart</span>
                </div>
            }
        </div>
    )
}
