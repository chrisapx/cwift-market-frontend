import { useParams } from "react-router-dom";
import './DDetails.scss';
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { BsFillCompassFill, BsPassport, BsPersonFill } from "react-icons/bs";

import DHeader from "../../components/header/DHeader";
import ItemDescription from "../../global/ItemDescription";
import { MdVerified } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import Footer from "../../components/d-footer/Footer";
import Signing from "../../components/d-footer/Signing";

const DDetailsPage = () => {

    const { itemID } = useParams();
    const { addToCart } = useCart();
    const [ select, setSelect ] = useState('');
    const [ item, setItem] = useState();
    const [ addCart, setAddCart ] = useState(false);
    const [clickedImage, setClickedImage] = useState('');

    const pdctInfo = [
        { id: 1,key: 'Weight', value: '123 g'},
        { id: 2,key: 'Dimentions', value: '12 * 12* 4 mm'},
        { id: 3,key: 'Manufucturer', value: 'Dell'},
        { id: 4,key: 'RAM', value: '8GB'},
        { id: 5,key: 'Processor', value: '2.4GHz'},
        { id: 6,key: 'ROM', value: '500GB HDD'},
        { id: 7,key: 'Screen size', value: '17.2 in'},
        { id: 8,key: 'DRAM', value: '400MB'},
        { id: 9,key: 'Color', value: 'Silver'},
        { id: 10,key: 'State', value: 'Used'},
        { id: 11,key: 'Backlight', value: 'On'},
        { id: 12,key: 'Camera', value: '5 MP'},

    ]

    const handleAddToCart = ( item ) => {
        addToCart(item);
        setAddCart(true);
        setTimeout(() => {
            setAddCart(false)
        }, 1000)
    }


    
    useEffect(() => {
        // fetch('http://127.0.0.1:8080/items/' + itemID)
        fetch('https://inventory.nalmart.com/items/' + itemID)
            .then((response) => response.json())
            .then((json) => {
            setItem(json);
    
            setClickedImage(json?.photos[0].url);
            console.log(json);
        })
        .catch((error) => {
            console.error(error);
        })

        
        
    }, [])
    
    const itemRating = item?.reviews.reduce((totalRate, review) => {
        if (review && review.rating !== undefined || review.rating != 0) return totalRate + review.rating;
        else return totalRate;
    }, 0)  

    return(
        <div className="details-frame">
            <title>{"Remote Control Car Stunt RC Cars, 90 Min Playtime, 2.4Ghz Double Sided 360° Rotating  RC Crawler with Headlights, 4WD Off Road Drift RC Race Car Toy for Boys and Girls Aged 6-12 Blue"}</title>
            <div style={{marginBottom: 20, position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 2, width: '100%'}}>
                <DHeader/>
            </div>
            <div className="details-body">
                {/* Item dir */}
                {/* <div id="item-dir">{"Electronics > Computers & phones > Laptops"}</div> */}
                
                {/* Item details section 1*/}
                <div className="details-sec-1">
                    {/* Side image list */}
                    <div id="side-img-list">
                        { item?.photos?.map((img, index) => (
                        <div key={index} id="side-img" onClick={() => setClickedImage(img.url)} onMouseOver={() => setClickedImage(img.url)}>
                            <img src={img.url} loading="lazy" alt="item img" width={'100%'}/>
                        </div>))}
                    </div>
                    {/* Full image */}
                    <div id="image-section">
                        <div id="main-img">
                            <img src={clickedImage} loading='lazy' width={'90%'} style={{objectFit: 'cover'}}/>
                        </div>
                    </div>
                    {/* Headers */}
                    <div id="name-section"> 
                        
                        {/* Item name */}
                        <div id="item-name">{item?.name}</div>
                        <div style={{fontSize: 16, color: 'rgb(5, 121, 106)'}}>{item?.brand}</div>
                        <div style={{display: "flex", flexDirection: 'row', alignItems: 'center', whiteSpace: 'nowrap', borderBottomWidth: 1, borderBottomColor: 'rgb(231, 227, 227)', borderBottomStyle: 'solid'}}>
                            <p style={{color: 'black', fontSize: 12, paddingLeft: 4, fontWeight: '600', marginRight: 5}}>{itemRating}</p>
                            <div onMouseOver={() => setSelect('star')} onMouseOut={() => setSelect('')}>
                                <StarRatings
                                        rating={itemRating}                                        
                                        starRatedColor="orange" 
                                        // changeRating={(newRating) => setRating(newRating)} // Update the rating directly
                                        numberOfStars={5} 
                                        name='rating'
                                        starDimension="15px" 
                                        starSpacing="1px"
                                    />
                            </div>
                            <div style={{color: select === 'rating'? 'orange' : 'rgb(5, 121, 106)' , textDecoration: select === 'rating' && 'underline', fontSize: 12, paddingLeft: 8, fontWeight: '600', cursor: 'pointer'}} onMouseOver={() => setSelect('rating')} onMouseOut={() => setSelect('')}>{item?.reviews?.length} ratings</div>
                            <div style={{color: 'black', fontSize: 8, paddingLeft: 10, }}> | </div>
                            <div style={{color: select === 'questions'? 'orange' : 'rgb(5, 121, 106)', textDecoration: select === 'questions' && 'underline', fontSize: 12, paddingLeft: 8, fontWeight: '600', cursor: 'pointer'}} onMouseOver={() => setSelect('questions')} onMouseOut={() => setSelect('')}> {0} answered questions</div>
                        </div>

                        {/* Description section */}
                        <div style={{borderBottomWidth: 1, borderBottomColor: 'rgb(231, 227, 227)', borderBottomStyle: 'solid'}}>
                            <div style={{padding: 6, fontSize: 14, fontWeight: '600', color: 'rgba(0,0,0,0.8)'}}>Description:</div>
                            <div style={{padding: 6, fontSize: 14}}> 
                                {item?.description ? <ItemDescription htmlContent={item?.description}/> : <div>No Description, Check the User manual</div>}
                            </div>
                        </div>
                        {/* Additional details */}
                        <div>
                            <div style={{padding: 6, fontSize: 14, fontWeight: '600', color: "rgba(0,0,0,0.8)"}}>Additional details:</div>
                            <div style={{paddingLeft: 6, fontSize: 14, fontWeight: '500', color: 'rgba(0,0,0,0.6)'}}>Color: {item?.color}</div>                            
                            <div style={{paddingLeft: 6, fontSize: 14, fontWeight: '500', color: 'rgba(0,0,0,0.6)'}}>User manual: <span ><a style={{color: 'blue'}} href="">download</a></span></div>

                            <div style={{padding: 6, fontSize: 14, fontWeight: '400', color: 'rgb(5, 121, 86)'}}>Verified by Nalmart QA<span><MdVerified/></span></div>
                        </div>

                    </div>
                    {/* Actions and state */}
                    <div id="action-section" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", borderWidth: 1, borderStyle: 'solid', borderColor: 'rgb(233, 223, 223)', padding: 16, borderRadius: 6, margin: 8, width: '80%'}}>

                            <div style={{fontSize: 10, color: 'orange', fontWeight: '700'}}>UGX <span style={{fontSize: 20, fontWeight: '500', color: 'black'}}>{item?.price.toLocaleString()}</span></div>
                            {item?.globalPrice ? <div style={{fontSize: 10, color: 'orange', fontWeight: '700'}}>UGX <span style={{fontSize: 16, fontWeight: '400', color: 'rgba(0,0,0,0.4)', textDecoration: 'line-through'}}>{item?.globalPrice.toLocaleString()}</span></div> : null}

                            <div style={{fontSize: 14, marginTop: 16}}>No featured offers available</div>
                            <div style={{fontSize: 14, color:'rgb(5, 121, 86)'}} onClick={() => {}}>Learn more</div>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", borderWidth: 1, borderStyle: 'solid', borderColor: 'rgb(233, 223, 223)', padding: 16, borderRadius: 6, margin: 8, width: '80%'}}>
                            <div style={{fontSize: 14, color: 'red'}}>Available</div>
                            <div style={{fontSize: 14, color:'rgb(5, 121, 86)', display: "flex", gap: 8, alignItems: "center", borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'rgb(233, 223, 243)', paddingBottom: 6, marginBlock: 8}}> 
                                <BsFillCompassFill color="grey"/> 
                                <div style={{color: select === 'delivery'? 'orange' : 'rgb(5, 121, 86)', cursor: 'pointer', fontSize: 12}} onMouseOver={() => setSelect('delivery')} onMouseOut={() => setSelect('')}>Delivery to Mbale</div>
                            </div>
                            <div style={{
                                color: 'white', 
                                cursor: "pointer", 
                                padding: 12, 
                                borderWidth: 1, 
                                borderStyle: 'solid', 
                                borderColor: select === 'acart' ? "orange" : 'rgb(233, 223, 243)', 
                                borderRadius: 6, 
                                marginBlock: 16, 
                                display: "flex", 
                                gap: 8, alignItems: "center", 
                                justifyContent: "center", 
                                backgroundColor: select === 'acart' ? 'red' : 'orange'}} 
                                onMouseOver={() => setSelect('acart')} 
                                onMouseOut={() => setSelect('')}
                                onClick={() => handleAddToCart(item)} >
                                Add to Cart
                            </div>
                        </div>
                    </div>


                </div>
                {/* Product info */}
                <div className="product-info-frame">
                    <div id="info-area">
                        <h1 id="product-info-header">Product information</h1>
                            {item?.details?.map((product, index) => (
                                <div key={index} id="info-table">
                                    <div style={{color: 'grey', height: 30}}>{product.name}:</div>
                                    <div style={{color: 'black'}}>{product.value}</div>
                                </div>
                            ))}
                    </div>
                    <div id="info-area">
                        <div>
                            <h id='product-info-header'>Waranty information</h>
                            <p style={{color: 'grey'}}>Not available</p>

                        </div>
                        <div>
                            <h id='product-info-header'>Return policy</h>
                            <p style={{color: 'grey'}}>Not available</p>

                        </div>
                    </div>
                </div>

                {/* Important information */}
                <div className="important-info">
                    <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)'}}>Important information</div>
                    <div id="product-report">
                        <div style={{color: 'black', fontSize: 14, paddingInline: 8}}>To report an issue with this product or seller, </div>
                        <div style={{color: 'rgb(5, 121, 86)', fontSize: 14,}}> Click here</div>
                    </div>

                </div>

                {/* Related items */}
                <div className="related-frame">
                <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)'}}>Related Items</div>
                    <div style={{color: 'red', fontSize: 14, paddingInline: 8}}>Comming soon ...........</div>
                </div>

                {/* What is in the box */}
                <div className="box-items-frame"> 
                    <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)'}}>What's in the Box</div>
                    <div>
                        <ItemDescription htmlContent={item?.whatIsInTheBox}/>
                    </div>
                </div>

                {/* Product guides and documents */}
                <div className="guide-doc-frame"> 
                    <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)'}}>Product guides and documents</div>
                    <div>
                        <a href="" style={{color: 'rgb(5, 121, 86)', fontSize: 14}}>Instructions of Use (UFU) (PDF)</a>
                    </div>

                </div>

                {/* Reviews and rating */}
                <div className="review-rate-frame"> 
                    <div>
                        <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)'}}>Customer reviews</div>
                        <div style={{display: "flex", alignItems:"center", paddingBottom: 20, paddingRight: 50, whiteSpace: 'nowrap' }}> 

                            <div style={{display: "flex", flexDirection: 'row', alignItems: 'center',whiteSpace: 'nowrap' }}>
                                <div onMouseOver={() => setSelect('star')} onMouseOut={() => setSelect('')}>
                                    <StarRatings
                                            rating={itemRating}
                                            starRatedColor="orange"
                                            // changeRating={(newRating) => setRating(newRating)} // Update the rating directly
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="16px"
                                            starSpacing="1px"
                                        />
                                </div>
                                <div style={{color: 'black' , textDecoration: select === 'rating' && 'underline', fontSize: 12, paddingLeft: 8, fontWeight: '400', cursor: 'pointer', marginRight: 8}} onMouseOver={() => setSelect('rating')} onMouseOut={() => setSelect('')}>{itemRating} OUT OF 5</div>
                            </div>
                            <div style={{color: 'grey', fontSize: 14}}>{item?.reviews?.length} Ratings</div>


                        </div>
                        <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)', paddingBlock: 16}}>Review this product</div>
                        <div style={{fontWeight: '400', fontSize: 14, color: 'black', }}>Share your thoughts with other customers</div>
                        <div style={{fontWeight: '400', fontSize: 12, color: 'black', borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: "center", borderWidth: 1, borderStyle: 'solid', borderColor: 'grey', marginTop: 40, height: 30, marginRight: 30, cursor: 'pointer', }} >Write a Customer review</div>

                    </div>

                    <div>
                        <div style={{fontWeight: '600', fontSize: 18, color: 'rgba(0,0,0,0.8)'}}>Review comments</div>
                        {!item?.reviews[0] ? <div style={{color: 'rgba(0,0,0,0.7)', fontSize: 12}}>No review comments for this product yet</div> : null}

                        { item?.reviews?.map((review, index) => (
                            <div key={index} style={{paddingBlock: 24}}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 14}}>
                                    <div style={{height: 30, width: 30, backgroundColor: 'rgba(200,200,200, 0.9)', borderRadius: 30, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <BsPersonFill/>
                                        {/* <img src="../src/assets/images/g-mouse.png" height={'90%'} width={'90%'}/> */}
                                    </div>
                                    <div style={{color: 'black', fontSize: 14}}>{review?.author}</div>
                                    <div style={{color: 'rgb(5, 121, 86)', fontSize: 12, fontWeight: '600'}}>Verified purchase</div>
                                </div>

                                <div style={{display: "flex", flexDirection: 'row', alignItems: 'center',whiteSpace: 'nowrap' }}>
                                    <div onMouseOver={() => setSelect('star')} onMouseOut={() => setSelect('')}>
                                        <StarRatings
                                                rating={review?.rating} // Initial rating
                                                starRatedColor="orange" // Color of selected stars
                                                // changeRating={(newRating) => setRating(newRating)} // Update the rating directly
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="12px"
                                                starSpacing="1px" // Spacing between stars
                                            />
                                    </div>
                                    <div style={{color: select === 'review-comm' ? 'orange' : 'black' , textDecoration: select === 'review-comm' && 'underline', fontSize: 14, paddingLeft: 8, fontWeight: '600', cursor: 'pointer'}} onMouseOver={() => setSelect('review-comm')} onMouseOut={() => setSelect('')}>{review?.tittle}</div>
                                </div>

                                {/* <div style={{fontSize: 14, color: 'grey'}}></div> */}
                                <div style={{fontSize: 14, color: 'black'}}>{review?.comment}</div>
                                

                            </div>
                        ))}


                    </div>
                </div>
                
            </div>
            <div>
                <div>
                    <Footer/>
                </div>
                <div>
                    <Signing/>
                </div>
            </div>      
        </div>
    )
}

export default DDetailsPage;