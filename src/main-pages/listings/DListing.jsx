import React, { useEffect, useState } from "react";
import './DListings.scss';
import DHeader from "../../components/header/DHeader";
import StarRatings from "react-star-ratings";
import { useCart } from "../../context/CartContext";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useListing } from "../../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

export default function DListings (){

    const [ addCart, setAddCart ] = useState(false);
    const [ minPrice, setMinPrice] = useState(0);
    const [ maxPrice, setMaxPrice] = useState(3000000);

    const [ items, setItems] = useState([]);
    const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
    const { listing } = useListing();
    const navigate = useNavigate();

    useEffect(() => {
        setItems(listing?.filter(ls => ls?.price >= minPrice && ls?.price <= maxPrice));
    }, [maxPrice, minPrice])

    const subCats = [
        {name: 'Lighting', image: '/src/assets/lighting.jpeg'},
        {name: 'Headphones, EarBuds & Accessories ', image: '/src/assets/h&ebuds.jpeg'},
        {name: 'Camera & Photo', image: '/src/assets/camera&photo.jpeg'},
        {name: 'Audio & Radio', image: '/src/assets/o&radio.jpeg'},
        {name: 'Phones & Tablets', image: '/src/assets/phones&tablets.jpeg'},
        {name: 'Laptops', image: '/src/assets/laptops.jpeg'},
        {name: 'Data Storage', image: '/src/assets/datastorage.jpeg'},
        {name: 'keyboards, Mice & Accessories', image: '/src/assets/keybord&mice.jpeg'},
        {name: 'Video Games', image: '/src/assets/videogames.jpeg'},
        {name: 'Hubs & Adapters', image: '/src/assets/hubd&adapters.jpeg'},
        {name: 'Computer accessories', image: '/src/assets/computing.jpeg'},
        {name: 'Batteries & Accessories', image: '/src/assets/battery.jpeg'},
        {name: 'USB Gadgets', image: '/src/assets/usbgadets.jpeg'},
        {name: 'power Strips', image: '/src/assets/powerStrips.jpeg'},
        
    ]

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
            <div style={{margin: 20, marginLeft: 40, display: 'flex', gap: 30, flexWrap: 'wrap'}}>
                {subCats?.map((sc, index) => (
                    <div key={index} style={{ width: 100, display: 'flex', flexDirection: "column", alignItems: 'center', marginRight: 10, cursor: 'pointer' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#f7f7f7' }}>
                            {/* <img src={sc?.image} alt="lighting" style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: '50%', }} /> */}
                        </div>
                        <div style={{ color: "rgba(0,0,0,0.8)", fontSize: 12, fontWeight: '500', marginTop: 5, textAlign: 'center'}}>{sc?.name}</div>
                    </div>

                ))}
            </div>

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

                        {/* <div class="filter-option">
                            <h4>Color</h4>
                            <select name="color" id="color-select">
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                            </select>
                        </div> */}
                        {/* <div class="filter-option">
                            <h4>Brand</h4>
                            <input type="checkbox" name="brand" value="brand1" id="brand1"/><label for="brand1">Brand 1</label><br></br>
                            <input type="checkbox" name="brand" value="brand2" id="brand2"/><label for="brand2">Brand 2</label><br></br>
                        </div>
                        <div class="filter-option">
                            <h4>Size</h4>
                            <input type="checkbox" name="size" value="small" id="small"/><label for="small">Small</label><br></br>
                            <input type="checkbox" name="size" value="medium" id="medium"/><label for="medium">Medium</label><br></br>
                        </div> */}
                        {/* <button type="submit">Apply Filters</button> */}
                    </form>

                </div>
                <div className="i-section">
                    <h1 id="i-header">Trending Items</h1>
                    
                    {items?.length == 0 ? <div>No Items</div> : null}

                    <div className="i-section-contents">
                        {items?.map((item, index) => (
                        <div className="i-card">
                            <div className="i-card-image" onClick={() => navigate('/details/' + item.itemID)}>
                                <img src={item?.coverPhoto?.url} width={'100%'} height={'100%'} style={{objectFit: 'contain', borderRadius: 4}}/>
                            </div>
                            <div className="i-info-section">
                                <p className="i-name">{item?.name}</p>
                                <p className="i-price">UGX {(item?.price).toLocaleString()} <span style={{marginLeft: 8, color: 'rgba(0,0,0,0.4)', fontSize: 12, textDecoration: 'line-through', fontWeight: 'normal'}}>UGX {(item?.globalPrice).toLocaleString()}</span></p>
                                <div style={{color: 'rgba(0,0,0,0.5)', fontSize: 14, fontWeight: '400'}}>{item?.stockCount} sold</div>
                                <div className="rating-n-cart">
                                    <div style={{fontSize: 12}}>
                                        <StarRatings
                                            rating={item?.reviews[0]?.rating}
                                            starRatedColor="black"
                                            numberOfStars={5}
                                            starDimension="14px"
                                            starSpacing="0px"
                                            name='rating'
                                            />({item?.reviews?.length})
                                    </div>
                                    <div style={{
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
                        ))}
                    </div>

                </div>
            </div>

            {addCart && 
                <div className='add-cart-notif'>
                    <TiTick size={20} />
                    <span>Item successfuly added to cart</span>
                </div>
            }
        </div>
    )
}
