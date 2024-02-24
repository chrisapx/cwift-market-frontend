import React, { useState } from "react";
import './DListings.scss';
import DHeader from "../../components/header/DHeader";
import StarRatings from "react-star-ratings";
import { useCart } from "../../context/CartContext";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useListing } from "../../context/ListingContext";

export default function DListings (){

    const [ addCart, setAddCart ] = useState(false);
    const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
    const { listing } = useListing();

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
        }, 1000)
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
                        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'grey' }}>
                            <img src={sc?.image} alt="lighting" style={{ width: '100%', height: '100%', objectFit: "cover", borderRadius: '50%', }} />
                        </div>
                        <div style={{ color: "rgba(0,0,0,0.8)", fontSize: 12, fontWeight: '500', marginTop: 5, textAlign: 'center'}}>{sc?.name}</div>
                    </div>

                ))}
            </div>

            <div className="listing-section">
                <div className="filters">
                    <h1 id="f-header">Filters</h1>

                    <div style={{height: 2000}}>Content</div>

                </div>
                <div className="i-section">
                    <h1 id="i-header">Trending Items</h1>

                    <div className="i-section-contents">
                        {listing?.map((item, index) => (
                        <div className="i-card">
                            <div className="i-card-image">
                                <img src={'/src/assets/hubd&adapters.jpeg'} width={'100%'} height={'100%'} style={{objectFit: 'contain', borderRadius: 4}}/>
                            </div>
                            <div className="i-info-section">
                                <p className="i-name">{item?.name}</p>
                                <p className="i-price">UGX {(item?.price).toLocaleString()} <span style={{marginLeft: 8, color: 'rgba(0,0,0,0.4)', fontSize: 12, textDecoration: 'line-through', fontWeight: 'normal'}}>UGX {(item?.globalPrice).toLocaleString()}</span></p>
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
        </div>
    )
}
