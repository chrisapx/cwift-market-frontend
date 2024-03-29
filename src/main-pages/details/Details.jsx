import StarRatings from 'react-star-ratings';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { MdVerifiedUser, MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import './Details.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useListing } from '../../context/ListingContext';
import ItemDescription from '../../global/ItemDescription';
import { useValue } from '../../context/ContextProvider';
import Slider from 'react-slick';
import { ArrowBack } from '@mui/icons-material';


const Details = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [addCart, setAddCart] = useState(false);
    const [item, setItem] = useState({});
    const [alsoViewed, setAlsoViewed] = useState([]);
    const [recents, setRecents] = useState([]);
    const { dispatch }  = useValue();
    const { itemID } = useParams();
    const { listing } = useListing();
    const { cartItems, addToCart, removeFromCart } = useCart();

    const handleAddToCart = ( item ) => {
        addToCart(item);
        setAddCart(true);
        setTimeout(() => {
            setAddCart(false)
        }, 1000)
    }

    
    useEffect(() => {
        // setLoading(true);
        dispatch({ type: 'START_LOADING' });
        
        // fetch('http://127.0.0.1:8080/items/' + itemID)
        fetch('https://inventory.nalmart.com/items/' + itemID)
            .then((response) => response.json())
            .then((json) => {
                setItem(json);
        })
        .catch((error) => {
            console.error(error);
        })
        
        fetch('https://inventory.nalmart.com/items')
            .then((response) => response.json())
            .then((json) => {
                setAlsoViewed(json.filter(itm => itm.category == item.category));
            })
        .catch((error) => {
            console.error(error);
        }) 
                
        document.title = item.name;
        document.description = item.description;
        
        // setLoading(false);
        dispatch({ type: 'END_LOADING' });

    }, [itemID]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
      };

    return(
        <div className='main-details-section'>

            <div className='header-sec'>
                <Header showBack={true}/>
            </div>

            {addCart && 
                <div className='add-cart'>
                    <TiTick size={20} />
                    <span>Item successfuly added to cart</span>
                </div>
            }

            {/* Images container */}
            <div className='images-container'>

                {item?.photos?.length > 1 ? (
                    <Slider {...settings}>
                        {item?.photos?.map((imge, index) => (
                            <div className='image-card' key={index}>
                                <img src={imge?.url} loading='lazy' alt={item.name} width={'100%'} height={'100%'} style={{ objectFit: 'contain' }} />
                            </div>
                        ))}
                    </Slider>
                ) :  (
                    item?.photos?.map((imge, index) => (
                        <div className='image-card' key={index}>
                            <img src={imge?.url} loading='lazy' alt={item.name} width={'100%'} height={'100%'} style={{ objectFit: 'contain' }} />
                        </div>
                    ))
                ) }

            </div>


            <div className='sec-1'>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', fontSize: 14, color: 'green'}}>
                    {/* <div style={{fontSize: 10, backgroundColor: '#0f562e', paddingInline: 5, width: 'fit-content', color: 'white', fontWeight: '600', marginBlock: 10, borderRadius: 1}}>{item.store ? 'Official Store' : item.store}</div> */}
                    <div style={{fontSize: 10, backgroundColor: '#0f562e', paddingInline: 5, paddingBlock: 2, width: 'fit-content', color: 'white', fontWeight: '600', marginBlock: 15, borderRadius: 1}}>Official Store</div>
                    <div>{item.original} <span><MdVerifiedUser size={12} /></span></div>
                </div>
                <div style={{fontSize: 13, color: 'black'}}>{item.name} <span style={{color: 'green', marginLeft: 5}}>{item.original}<MdVerifiedUser size={12} /></span></div>
                <div style={{fontSize: 12}}>Brand: <span style={{color: 'blue'}}>{item.brand}</span> | <span style={{color: 'blue'}}>similar products</span></div>
                <div style={{color: 'black', fontWeight: '600'}}>UGX <span>{item.price?.toLocaleString()}</span> <span style={{textDecoration: 'line-through', color: 'grey', fontSize: 12, fontWeight: '500'}}> UGX {(item.globalPrice)?.toLocaleString()}</span></div>
                <StarRatings
                    rating={item.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="0px"
                    name='rating'
                    /> 
                <span style={{color: '#0f562e', fontSize: 12}}> ({item.reviews?.length}) Verified ratings</span>
                
            </div>

            {/* Product details header */}
            <div style={{paddingInline: 15, color: 'grey', fontSize: 10, fontWeight: '600'}}> PRODUCT DETAILS</div>

            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Description</div>
                {item?.description ? <ItemDescription htmlContent={item?.description}/> : <div>No Description, Check the User manual</div>}
            </div>

            {item?.guide ? <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Item User Manual</div>
                <div><a style={{color: 'blue'}} href=''>download user manual</a></div>
            </div> : null}

            

            {/* Customers also viewed */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Customers also viewed</div>
                <div className='recomendation-section'>
                    <div className="recom-list">
                        {alsoViewed?.map((item, index) => (
                        <div className="recom-card" key={index} onClick={() => navigate('/details/' + item.itemID)}>
                            <div className="recom-image">
                                {item.coverPhoto ? 
                                    <img src={item.coverPhoto.url} alt={item.name} height={'100%'} width={'100%'} style={{objectFit: 'contain'}}/> : 
                                    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12}}>No image</div>
                                }
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item?.name}</div>
                                <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price?.toLocaleString()}</span></div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Info header */}
            <div style={{paddingInline: 15, color: 'grey', fontSize: 10, fontWeight: '600'}}> PRODUCT INFO</div>

            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Information table</div>
                {item.details?.map((inf, index) => (
                    <div style={{marginBottom: 3}} key={index}>
                        <div style={{color: 'grey', }}>{inf.name} : <span style={{color: 'black', marginLeft: 20, }}>{inf.value}</span></div>
                    </div>
                ))}
            </div>

            {/* Customer feedback header */}
            <div style={{paddingInline: 15, color: 'grey', fontSize: 10, fontWeight: '600'}}> CUSTOMER FEEDBACK</div>

            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Product reviews</div>

                {item.reviews?.map ((review, index) => index < 5 && (
                    <div key={index} style={{marginBottom: 16}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', color: 'grey'}}>
                            <StarRatings
                                rating={item.reviews.rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starDimension="12px"
                                starSpacing="0px"
                                name='rating'
                                />
                                <div>{review.reviewDate}</div>
                        </div>
                        <div style={{fontSize: 13, fontWeight: '600'}}>{review.tittle}</div>
                        <div>{review.comment}</div>

                        <div style={{display: 'flex', justifyContent: 'space-between', color: 'grey'}}>
                            <div>By: {review.author}</div>
                            <div style={{color: 'green', fontSize: 12}}><MdVerifiedUser size={12} /> <span> Verified purchase</span></div>
                        </div>
                    </div>
                ))}
            </div>


            

            <div className='add-to-cart'>
                    <div style={{backgroundColor: 'orange', borderTopLeftRadius: 30, borderBottomLeftRadius: 30}} className='add-item' onClick={() => handleAddToCart(item)}>Add to cart</div>
                    <div style={{backgroundColor: 'red', borderTopRightRadius: 30, borderBottomRightRadius: 30}} className='add-item' onClick={() => {
                        addToCart(item);
                        navigate('/cart');
                    }}>Buy now</div>
            </div>

            {/* Recently viewed */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Recently viewed</div>
                <div className='recomendation-section'>
                    <div className="recom-list">
                        {recents?.map((item, index) => (
                        <div className="recom-card" key={index} onClick={() => setItem(item)}>
                            <div className="recom-image">
                                {item.coverPhoto ? <img src={item.coverPhoto.url} alt={item.name} height={'100%'} width={'100%'} style={{objectFit: 'contain'}} /> :
                                <img src={'/src/assets/cwift-logo.png'} alt={item.name} height={'100%'} width={'100%'} style={{objectFit: 'contain'}} />}
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item?.name}</div>
                                {item?.description && <div style={{ fontSize: 12, fontWeight: '600', color: 'black',overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item?.description}</div>}
                                <div style={{color: 'black', fontSize: 14}}>UGX <span style={{fontSize: 20, color: 'black', fontWeight: '600'}}>{item.price?.toLocaleString()}</span></div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='footer-section'>
                <Footer/>
            </div>


            {loading && 
            <div className='confirm-overlay' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 10, borderRadius: 5, backgroundColor: 'white', }}>
                    Just a sec...
                </div>
            </div>}

        </div>
    )
}

export default Details;