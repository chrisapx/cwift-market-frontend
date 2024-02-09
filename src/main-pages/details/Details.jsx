import StarRatings from 'react-star-ratings';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { MdVerifiedUser, MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import './Details.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

const Details = () => {

    const navigate = useNavigate();
    const [addCart, setAddCart] = useState(false);
    const [item, setItem] = useState({});
    const [alsoViewed, setAlsoViewed] = useState([]);
    const [recents, setRecents] = useState([]);
    const { itemID } = useParams();
    const { cartItems, addToCart, removeFromCart } = useCart();

    const handleAddToCart = ( item ) => {
        addToCart(item);
        setAddCart(true);
        setTimeout(() => {
            setAddCart(false)
        }, 4000)
    }

    useEffect(() => {

        // Section for fetching item to show in details
        fetch('http://inventory.nalmart.com/items/' + itemID)
          .then((response) => response.json())
          .then((json) => {
            setItem(json);
          })
          .catch((error) => {
            console.error(error);
          })

        //   Section for fetching more to love
        fetch('http://inventory.nalmart.com/items')
          .then((response) => response.json())
          .then((json) => {
            setAlsoViewed(json);
          })
          .catch((error) => {
            console.error(error);
          }) 

          //   Section for fetching more to love
        fetch('http://inventory.nalmart.com/items')
            .then((response) => response.json())
            .then((json) => {
            setRecents(json);
            })
            .catch((error) => {
                console.error(error);
            }) 

    }, []);
    
    const images = [
        {img: 'src/assets/iPhone12.png'},
        {img: "src/assets/Laptop.png"},
        {img: "https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2FiPhone12.png2b450672-a0ad-40c4-8ee3-81390d15cac6?alt=media&token=dcaeb4f3-8ae4-4834-8511-75e6add24c20"},
        {img: "https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fmenu-3.pngef2cd3b5-0d54-465c-b991-6e9e96f09be9?alt=media&token=c70eaca9-f29e-4781-ae53-533d6b9a047f"},
        // {img: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2FLaptop.png135731d9-b82a-4820-a165-1365740aeb54?alt=media&token=5eeba4a5-73a9-4164-9654-ae46dcc20bc9'}
    ]

    const recom = [
        {
          name: 'iPhone 12, 2023 edition',
          price: 234532,
          description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
          delivery: true,
          img: 'src/assets/iPhone12.png',
        },
        {
          name: 'phones',
          price: 234532,
          description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
          delivery: true,
          img: 'src/assets/Laptop.png',
        },
        {
          name: 'phones',
          price: 234532,
          description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
          delivery: true,
          img: 'src/assets/Speaker.png',
        },
        
      ];

      const info = [
        {id: 'Qty', value: '1pc'},
        {id: 'Dimentions', value: '2mm * 3mm * 4mm'},
        {id: 'Brand', value: 'Tecno'},
        {id: 'Model', value: '2024'},
        {id: 'Weight', value: '120g'},
        {id: 'State', value: 'Brand new'},
        {id: 'Seller', value: 'Suip T ventures'},

      ]

      const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };
    
    return(
        <div className='main-details-section'>

            <title>{item.name}</title>
            <div className='header-sec'>
                <Header showBack={true} showSearch={true}/>
            </div>

            {addCart && 
                <div className='add-cart'>
                    <TiTick size={20} />
                    <span>Item successfuly added to cart</span>
                </div>
            }

            {/* Images container */}
            { item.photos ?
                <div className='images-container'>
                    {item.photos?.map((imge, index) => (
                    <div className='image-card' key={index}>
                        <img src={imge.url} loading='lazy' alt={item.name} width={'90vw'}/>
                    </div>
                    ))}
                </div> :
                <div className='images-container'>
                    {images.map((imge, index) => (
                    <div className='image-card' style={{width: '90vw', }} key={index}>
                        <img src={'/src/assets/cwift-logo.png'} loading='lazy' alt='' height={'90%'} />
                    </div>
                    ))}
                </div>
            }

            <div className='sec-1'>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', fontSize: 14, color: 'green'}}>
                    {/* <div style={{fontSize: 10, backgroundColor: '#0f562e', paddingInline: 5, width: 'fit-content', color: 'white', fontWeight: '600', marginBlock: 10, borderRadius: 1}}>{item.store ? 'Official Store' : item.store}</div> */}
                    <div style={{fontSize: 10, backgroundColor: '#0f562e', paddingInline: 5, paddingBlock: 2, width: 'fit-content', color: 'white', fontWeight: '600', marginBlock: 15, borderRadius: 1}}>Official Store</div>
                    {/* <div>Original <span><MdVerifiedUser size={12} /></span></div> */}
                    <div>{item.original} <span><MdVerifiedUser size={12} /></span></div>
                </div>
                <div style={{fontSize: 13, color: 'black'}}>{item.name} <span style={{color: 'green', marginLeft: 5}}>{item.original}<MdVerifiedUser size={12} /></span></div>
                <div style={{fontSize: 12}}>Brand: <span style={{color: 'blue'}}>{item.brand}</span> | <span style={{color: 'blue'}}>similar products</span></div>
                <div style={{color: 'black', fontWeight: '600'}}>UGX <span>{item.price?.toLocaleString()}</span> <span style={{textDecoration: 'line-through', color: 'grey', fontSize: 12, fontWeight: '500'}}> UGX {(item.price + item.price * item.discount / 100)?.toLocaleString()}</span></div>
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
                <div>{item.description}</div>
            </div>

            {/* Customers also viewed */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Customers also viewed</div>
                <div className='recomendation-section'>
                    <div className="recom-list">
                        {alsoViewed?.map((item, index) => (
                        <div className="recom-card" key={index} onClick={() => setItem(item)}>
                            <div className="recom-image">
                                {alsoViewed.coverPhoto ? <img src={item.coverPhoto.url} alt={item.name} height={'90%'}/> : 
                                                         <img src={'/src/assets/cwift-logo.png'} alt={item.name} height={'90%'}/>
                                }
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item?.name}</div>
                                {item?.description && <div style={{ fontSize: 12, fontWeight: '600', color: 'black',overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item?.description}</div>}
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
                    <div style={{backgroundColor: 'red', borderTopRightRadius: 30, borderBottomRightRadius: 30}} className='add-item'>Buy now</div>
            </div>

            {/* Recently viewed */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Recently viewed</div>
                <div className='recomendation-section'>
                    <div className="recom-list">
                        {recents?.map((item, index) => (
                        <div className="recom-card" key={index} onClick={() => setItem(item)}>
                            <div className="recom-image">
                                {item.coverPhoto ? <img src={item.coverPhoto.url} alt={item.name} height={'90%'} /> :
                                <img src={'/src/assets/cwift-logo.png'} alt={item.name} height={'90%'} />}
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

        </div>
    )
}

export default Details;