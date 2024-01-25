import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { MdDeleteOutline } from "react-icons/md";
import './Cart.scss'
import Footer from '../../components/footer/Footer';
import { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { useCart } from '../../context/CartContext';

const Cart = () => {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();

    const handleCheckoutCart = () => {
        navigate('/checkout')
        // go to the checkout page
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };

    useEffect(() => {
        fetch('http://127.0.0.1:8080/items')
          .then((response) => response.json())
          .then((json) => {
            setItems(json);
            console.log(items)
          })
          .catch((error) => {
            console.error(error);
          })
  
      }, []);

    const recom = [
        {
          id: 1,
          name: 'iPhone 12, 2023 edition',
          price: 764532,
          description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
          delivery: true,
          img: 'src/assets/iPhone12.png',
        },
        {
          id: 2,
          name: 'phones',
          price: 984532,
          description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
          delivery: true,
          img: 'src/assets/Laptop.png',
          discount: 23
        },
        {
          id:  3,
          name: 'phones',
          price: 65532,
          description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
          delivery: true,
          discount: 65,
          img: 'src/assets/Speaker.png',
        },
        {
            name: 'iPhone 12, 2023 edition',
            id: 4,
            price: 764532,
            description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
            delivery: true,
            img: 'src/assets/iPhone12.png',
          },
          {
            name: 'phones',
            id: 5,
            price: 984532,
            description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
            delivery: true,
            img: 'src/assets/Laptop.png',
            discount: 23
          },
          {
            name: 'phones',
            id: 6,
            price: 65532,
            description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
            delivery: true,
            discount: 65,
            img: 'src/assets/Speaker.png',
          },
        
      ];

    const [addCart, setAddCart] = useState(false);

    const handleAddToCart = ( item ) => {
        addToCart( item );
        setAddCart(true);
        setTimeout(() => {
            setAddCart(false)
        }, 4000)
    }
    return(
        <div className='main-cart-section'>
            <div className='header-section' >
                <Header showBack={true} showSearch={true}/>
            </div>

            {addCart && 
                <div className='add-cart-notif'>
                    <TiTick size={20} />
                    <span>Item successfuly added to cart</span>
                </div>
            }

            {/* Cart summery header */}
            <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '600'}}> CART SUMMERY</div>

            <div className='sec-1' style={{color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Subtotal</div>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>UGX {(1123433).toLocaleString()}</div>
            </div>

            {/* Cart items header */}
            <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '600'}}> CART</div>

            {/* Cart items */}
                
            {cartItems?.map((item, index) => (
                <div className='sec-2' style={{paddingBlock: 12, color: 'black', fontSize: 12}}>
                    <div className='item-sec'>
                        <div className='img-sec'>
                            <img src={item.img} height={'100%'} width={'100%'}/>
                        </div>
                        <div className='item-details'>
                            <div style={{fontSize: 12, fontWeight: '600'}}>{item.name}</div>
                            <div style={{fontSize: 10}}>{item.description}</div>
                            <div style={{fontSize: 14, fontWeight: '500'}}>UGX {(item.price).toLocaleString()} <span style={{textDecoration: 'line-through', color: 'grey', fontWeight: 'normal', fontSize: 10}}>UGX {(item.price).toLocaleString()} </span></div>
                        </div>
                    </div>

                    {item.discount && <div className='discount'>-{item.discount}%</div>}
                    <div className='btns'>
                        <div className='remove-btn'>
                            <MdDeleteOutline size={16} color={'orange'}/>
                            <span style={{color: 'orange', fontSize: 12, }} onClick={() => removeFromCart(item.itemID)}>Remove</span>
                        </div>
                        <div className='three-btns'>
                            <div className='itm-btn'>-</div>
                            <div className='count'>1</div>
                            <div className='itm-btn'>+</div>
                        </div>
                    </div>
                </div>
                ))
            }
            {/* Favourites header */}
            <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '600'}}>FAVORITES</div>

            {/* Favorites */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Favorites</div>
                <div className='recom-section'>
                    <div className="recom-list">
                        {items.map((item, index) => (
                        <div className="recom-card" key={index} >
                            <div className="recom-image" onClick={() => navigate('/details/' + item.itemID)}>
                                {/* <img src={item.coverPhoto} alt={item.name} height={'100%'}/> */}
                                <img src='src/assets/Laptop.png' height={'100%'}/>
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.name}</div>
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.description ? truncateText(item.description, 30) : ''}</div>
                                <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                                <div className='add-cart' onClick={() => handleAddToCart(item)}>ADD</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Recently viewed items</div>
                <div className='recom-section'>
                    <div className="recom-list">
                        {items.map((item, index) => (
                        <div className="recom-card" key={index} style={{height: 170}}>
                            <div className="recom-image" onClick={() => navigate('/details/' +item.itemID)}>
                                <img src={item.coverPhoto} alt={item.name} height={'100%'} />
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.name}</div>
                                <div style={{ fontSize: 12, fontWeight: '500', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.description ? truncateText(item.description, 20) : ''}</div>
                                <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                                <div className='add-cart' onClick={() => handleAddToCart(item)}>ADD</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
                

            
            {/* Most popular */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>

                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Most popular</div>
                <div className='recom-section'>
                    <div className="recom-list">
                        {items.map((item, index) => (
                        <div className="recom-card" key={index} style={{height: 180}}>
                            <div className="recom-image" onClick={() => navigate('/details/' +item.itemID)}>
                                <img src={item.img} alt={item.name} height={'100%'} />
                            </div>
                            <div className="recom-details">
                                <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.name}</div>
                                <div style={{ fontSize: 12, fontWeight: '500', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.description? truncateText(item.description, 20) : ''}</div>
                                <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                                <div className='add-cart' onClick={() => handleAddToCart(item)}>ADD</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='checkout-cart' onClick={handleCheckoutCart}>
                <div style={{backgroundColor: 'orange', borderRadius: 3, width: '100%', marginInline: 10, cursor: 'pointer'}} className='inner-item' onClick={handleCheckoutCart}>CHECKOUT (UGX {(totalPrice).toLocaleString() })</div>
            </div>
            
            <Footer/>

        </div>
    )
}

export default Cart;