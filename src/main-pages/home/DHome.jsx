import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/d-footer/Footer";
import Signing from "../../components/d-footer/Signing";
import DHeader from "../../components/header/DHeader";
import StarRatings from "react-star-ratings";
import { useListing } from "../../context/ListingContext";
import { useEffect, useState } from "react";
import './DHome.scss'
import { GiCometSpark, GiSparkles } from "react-icons/gi";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { BsChevronDoubleRight, BsHeart, BsHeartFill } from "react-icons/bs";
import { Box } from "@mui/material";


const DHome = () => {
    const navigate = useNavigate();

    const { listing } = useListing();
    const [ items, setItems ] = useState();
    const [ subCategory, setSubCategory] = useState('Recomended');
    const [ addCart, setAddCart ] = useState(false);
    const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        setItems(listing?.filter(e => e?.globalPrice != null && e?.globalPrice != 0));
    }, [listing])

    const subCats = [
        {name: 'Recomended', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flighting.jpeg57e8c991-b2f3-4dc8-b493-6eff339937a1?alt=media&token=dbf37ac9-6308-414a-8630-6e02f7055bc2'},
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
        }, 1000)
      }

    return(
        <div className="d-home-frame">
            <div className="h-header">
                <DHeader bc={'orangered'}/>
            </div>

            <div className="cat-bar">
                <div className="cat-bar-item">Home</div>
                <div className="cat-bar-item">
                    <BsHeartFill/>
                    <div>Saved</div>
                </div>
                {subCats?.map((cat, index) => (
                    <div 
                        className="cat-bar-item" 
                        onClick={() => navigate('/listings/' +cat.name)}>
                        {cat.name}</div>
                ))
                }
                <div style={{position: "sticky", right: 0, backgroundColor: 'white', paddingLeft: 6}}><BsChevronDoubleRight/></div>
            </div>
            {/* <div className="ad-image" style={{}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2F98658cdd-c5e8-4603-9ea7-b6c254e66e7d.png26c5f385-74e8-4220-8b5a-6e06be571dbf?alt=media&token=2198a089-369e-4d50-9bfb-afa7f242f695" width={'100%'} style={{objectFit: 'contain', borderRadius: 12}}/>
            </div> */}

            {/* Deals section */}

            <div className="promo-header" >
                <GiCometSpark/>
                <div>Sparking deals</div>
                <div style={{display: 'flex', alignItems: "center", fontWeight: '500', fontSize: 16, fontStyle: 'normal', cursor: 'pointer'}}>
                    <p>Hot offers</p>
                    <FaChevronRight/>
                </div>
            </div>

            <div className="i-section-contents-1">
                {items?.map((item, index) => {
                    const itemRating = item?.reviews.reduce((totalRate, review) => {
                        if (review && review.rating !== undefined || review.rating != 0) return totalRate + review.rating;
                        else return totalRate;
                    }, 0.0)

                    return(
                <div key={index} className="i-card">
                    <div className="i-card-image" onClick={() => navigate('/details/' + item.itemID)}>
                        <img src={item?.coverPhoto?.url} width={'100%'} height={'100%'} style={{objectFit: 'contain', borderRadius: 4}}/>
                    </div>
                    <div className="i-info-section">
                        <div className="i-name">{item?.name}</div>
                        <div className="i-price">
                            <p style={{fontSize: 10, color: 'grey'}}>UGX <span style={{fontSize: 16, color: 'orangered'}}> {(item?.price).toLocaleString()}</span></p> 
                            <div style={{color: 'rgba(0,0,0,0.5)', fontSize: 14, fontWeight: '400'}}>{item?.stockCount} sold</div>
                        </div>
                    </div>
                    {item.discount <= 0? null : <Box
                        sx={{
                            position: 'relative',
                            bottom: 270,
                            bgcolor: 'red',
                            color: 'white',
                            fontSize: 14,
                            width: 'fit-content',
                            p: 0.3

                        }}
                    >{(((item?.globalPrice - item?.price)/item?.globalPrice) * 100).toFixed(1)}% OFF</Box>}
                </div>
                )}
                )}
            </div>

            <div className="ls-header">EXPLORE YOUR NEEDS</div>

            <div className="cat-section">
                {subCats?.map((cat, index ) => (
                    <div key={index} className="cat-card" onClick={() => setSubCategory(cat)}>{cat?.name}</div>
                ))}
            </div>
            <div className="i-section-contents" style={{flexWrap: 'wrap'}}>
                {items?.map((item, index) => {

                    const itemRating = item?.reviews.reduce((totalRate, review) => {
                        if (review && review.rating !== undefined || review.rating != 0) return totalRate + review.rating;
                        else return totalRate;
                    }, 0.0)

                    return(
                <div key={index} className="i-card">
                    <Link to={'/details/' +item?.itemID} className="i-card-image" onClick={() => navigate('/details/' + item.itemID)}>
                        <img src={item?.coverPhoto?.url} width={'100%'} height={'100%'} style={{objectFit: 'contain', borderRadius: 4}}/>
                    </Link>
                    <Link to={'/details/' +item?.itemID} className="i-info-section">
                        <p className="i-name">{item?.name}</p>
                        <div className="i-price">
                            <p style={{fontSize: 10, color: 'grey'}}>UGX <span style={{fontSize: 16, color: 'black'}}> {(item?.price).toLocaleString()}</span></p> 
                            <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 12, textDecoration: 'line-through', fontWeight: 'normal'}}>UGX {(item?.globalPrice).toLocaleString()}</div>
                            { item?.globalPrice && <div style={{color: 'red', fontSize: 12, fontWeight: '500', borderColor: 'rgba(255,0,0,0.5)', borderWidth: 1, marginLeft: 5, borderStyle: 'solid', padding: 6, borderRadius: 4}}>-{(((item?.globalPrice - item?.price)/item?.globalPrice) * 100).toFixed(1)}%</div>}
                        </div>
                        <div style={{color: 'rgba(0,0,0,0.5)', fontSize: 14, fontWeight: '400'}}>{item?.stockCount} sold</div>
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
                        {/* <div></div> */}

                        </div>
                    </Link>
                </div>
                )}
                )}
            </div>
            


            <Footer/>
            <Signing/>
        </div>
    )
}

export default DHome;