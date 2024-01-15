import StarRatings from 'react-star-ratings';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { MdVerifiedUser, MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import './Details.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Details = () => {

    const navigate = useNavigate();
    const [addCart, setAddCart] = useState(false);

    const handleAddToCart = () => {
        setAddCart(true)
        setTimeout(() => {
            setAddCart(false)
        }, 4000)
    }
    
    const images = [
        {img: 'src/assets/iPhone12.png'},
        {img: "src/assets/Laptop.png"},
        {img: "src/assets/iPhone12.png"},
        {img: "src/assets/Speaker.png"},
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
            <div className='images-container'>
                {images.map((imge, index) => (
                <div className='image-card'>
                    <img src={imge.img} alt='iPhone12' height={'100%'} width={'100%'}/>
                </div>
                ))}
            </div>

            <div className='sec-1'>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', fontSize: 14, color: 'green'}}>
                    <div style={{fontSize: 10, backgroundColor: '#0f562e', paddingInline: 5, width: 'fit-content', color: 'white', fontWeight: '600', marginBlock: 10, borderRadius: 1}}>Official store</div>
                    {/* <div>Original <span><MdVerifiedUser size={12} /></span></div> */}
                    <div>Copy 1 <span><MdVerifiedUser size={12} /></span></div>
                </div>
                <div style={{fontSize: 13, color: 'black'}}>Tecno Pop 7 - 6.6" 2GB RAM 64GB ROM 8MP 5000mAh - Black <span style={{color: 'green', marginLeft: 5}}>Copy 1 <MdVerifiedUser size={12} /></span></div>
                <div style={{fontSize: 12}}>Brand: <span style={{color: 'blue'}}>Tecno</span> | <span style={{color: 'blue'}}>similar products</span></div>
                <div style={{color: 'black', fontWeight: '600'}}>UGX <span>{(342567).toLocaleString()}</span> <span style={{textDecoration: 'line-through', color: 'grey', fontSize: 12, fontWeight: '500'}}> UGX {(380000).toLocaleString()}</span></div>
                <StarRatings
                    rating={3.7}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="0px"
                    name='rating'
                    /> <span style={{color: '#0f562e', fontSize: 12}}> (123) Verified ratings</span>
                
            </div>

            {/* Product details header */}
            <div style={{paddingInline: 15, color: 'grey', fontSize: 10, fontWeight: '600'}}> PRODUCT DETAILS</div>

            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Description</div>
                <div>32 Inch Frameless HD Digital LED TV - Black
                Select and Shop From a Wide Range of Pixel LED Tv's Collection Online on Gadget Boss Uganda - Enjoy Best Online Shopping Experience with Gadget Boss Uganda With Fast Delivery and Flexible Payment on Delivery
                </div>
            </div>

            {/* Customers also viewed */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Customers also viewed</div>
                <div className='recomendation-section'>
                    <div className="recom-list">
                        {recom.map((item, index) => (
                        <div className="recom-card" key={index} onClick={() => navigate('/details')}>
                            <div className="recom-image">
                                <img src={item.img} alt={item.name} width={'100%'} height={'100%'}/>
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{truncateText(item.description, 20)}</div>
                                <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
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
                {info.map((inf, index) => (
                    <div style={{marginBottom: 3}}>
                        <div style={{color: 'grey', }}>{inf.id} : <span style={{color: 'black', marginLeft: 20, }}>{inf.value}</span></div>
                    </div>
                ))}
            </div>

            {/* Customer feedback header */}
            <div style={{paddingInline: 15, color: 'grey', fontSize: 10, fontWeight: '600'}}> CUSTOMER FEEDBACK</div>

            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Product reviews</div>

                {recom.map ((review, index) => index < 5 && (
                    <div id={index} style={{marginBottom: 16}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', color: 'grey'}}>
                            <StarRatings
                                rating={3.7}
                                starRatedColor="orange"
                                numberOfStars={5}
                                starDimension="12px"
                                starSpacing="0px"
                                name='rating'
                                />
                                <div>11-01-2024</div>
                        </div>

                        <div>The tv works very well. Nice picture and the frameless shape makes it more beautiful</div>

                        <div style={{display: 'flex', justifyContent: 'space-between', color: 'grey'}}>
                            <div>By: Chris</div>
                            <div style={{color: 'green', fontSize: 12}}><MdVerifiedUser size={12} /> <span> Verified purchase</span></div>
                        </div>
                    </div>
                ))}
            </div>


            

            <div className='add-to-cart'>
                    <div style={{backgroundColor: 'orange', borderTopLeftRadius: 30, borderBottomLeftRadius: 30}} className='add-item' onClick={handleAddToCart}>Add to cart</div>
                    <div style={{backgroundColor: 'red', borderTopRightRadius: 30, borderBottomRightRadius: 30}} className='add-item'>Buy now</div>
            </div>

            {/* Recently viewed */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Recently viewed</div>
                <div className='recomendation-section'>
                    <div className="recom-list">
                        {recom.map((item, index) => (
                        <div className="recom-card" key={index} onClick={() => navigate('/details')}>
                            <div className="recom-image">
                                <img src={item.img} alt={item.name} width={'100%'} height={'100%'} />
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 14, fontWeight: '600', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{truncateText(item.description, 20)}</div>
                                <div style={{color: 'black', fontSize: 14}}>UGX <span style={{fontSize: 20, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
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