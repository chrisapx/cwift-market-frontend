import { useNavigate } from "react-router-dom";
import Footer from "../../components/d-footer/Footer";
import Signing from "../../components/d-footer/Signing";
import DHeader from "../../components/header/DHeader";
import StarRatings from "react-star-ratings";
import { useListing } from "../../context/ListingContext";
import { useEffect, useState } from "react";
import './DHome.scss'
import { GiCometSpark, GiSparkles } from "react-icons/gi";
import { FaChevronRight } from "react-icons/fa";


const DHome = () => {
    const navigate = useNavigate();

    const { listing } = useListing();
    const [ items, setItems ] = useState();

    useEffect(() => {
        setItems(listing?.filter(e => e?.globalPrice != null && e?.globalPrice != 0));
    })
    return(
        <div className="d-home-frame">
            <div style={{width: '100vw', position: "sticky", top: 0, backgroundColor: 'white', zIndex: 1}}>
                <DHeader />
            </div>
            <div style={{}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2F98658cdd-c5e8-4603-9ea7-b6c254e66e7d.png26c5f385-74e8-4220-8b5a-6e06be571dbf?alt=media&token=2198a089-369e-4d50-9bfb-afa7f242f695" width={'100%'} style={{objectFit: 'contain'}}/>
            </div>

            {/* Deals section */}

            <div style={{display: "flex", justifyContent: "center", alignItems: 'center', fontSize: 30, fontWeight: '700', fontStyle: 'italic', gap: 20, color: 'rgba(0,0,0,0.7)', marginTop: 30, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)'}}>
                <GiCometSpark/>
                <div>Sparking deals</div>
                <div style={{display: 'flex', alignItems: "center", fontWeight: '500', fontSize: 16, fontStyle: 'normal', cursor: 'pointer'}}>
                    <p>Hot offers</p>
                    <FaChevronRight/>
                </div>
            </div>

            <div className="i-section-contents">
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
                        {/* <p className="i-name">{item?.name}</p> */}
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
                            {/* <div style={{
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
                            </div> */}
                        {/* <div></div> */}

                        </div>
                    </div>
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