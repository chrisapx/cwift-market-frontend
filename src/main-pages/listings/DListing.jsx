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
                            <img src={sc?.image} alt="lighting" style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: '50%', }} />
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
