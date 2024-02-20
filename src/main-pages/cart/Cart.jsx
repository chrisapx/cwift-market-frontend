import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { MdDeleteOutline } from "react-icons/md";
import './Cart.scss'
import Footer from '../../components/footer/Footer';
import { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { useCart } from '../../context/CartContext';
import { HiHeart } from 'react-icons/hi';
import { FaHeartCircleCheck, FaHeartCirclePlus } from 'react-icons/fa6';

const Cart = () => {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [ tPrice, setTPrice ] = useState();
    const { 
        cart,
        favorites, 
        totalPrice, 
        getItemQuantity, 
        addToCart, 
        reduceCart,
        incrementCart, 
        removeFromCart,
        addToFavorites,
        removeFromFavorites
     } = useCart();

    const handleCheckoutCart = () => {
        // go to the checkout page
        navigate('/checkout')
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };

      useEffect(() => {
        // Calculate total price based on the items in the cart
        const totalPrice = cart.reduce((acc, order) => acc + (order.item.price * getItemQuantity(order.item)), 0);
        setTPrice(totalPrice);
    }, [cart]);
    

    useEffect(() => {
        fetch('https://inventory.nalmart.com/items')
          .then((response) => response.json())
          .then((json) => {
            setItems(json);
            console.log(items)
          })
          .catch((error) => {
            console.error(error);
          })
  
      }, []);

    const [addCart, setAddCart] = useState(false);

    const handleAddToCart = ( item ) => {
        addToCart( item );
        setAddCart(true);
        setTimeout(() => {
            setAddCart(false)
        }, 1000)
    }
    return(
        <div className='main-cart-section'>
            <div className='header-section' >
                <Header showBack={true} />
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
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>UGX {(totalPrice).toLocaleString()}</div>
            </div>

            {/* Cart items header */}
            <div style={{paddingInline: 15, paddingBlock: 10, color: 'grey', fontSize: 10, fontWeight: '600'}}> CART</div>

            {/* Cart items */}
                
            {cart?.map((order, index) => { 
                const quantity = getItemQuantity(order?.item); 
                return (
                <div key={index} className='sec-2' style={{paddingBlock: 12, color: 'black', fontSize: 12}}>
                    <div className='item-sec'>
                        <div style={{display: 'flex', }}>
                            <div className='img-sec'>
                                <img src={order.item.coverPhoto?.url} height={'100%'} width={'100%'}/>
                            </div>
                            <div className='item-details'>
                                <div style={{fontSize: 12, fontWeight: '600'}}>{order?.item.name.slice(0, 50)}</div>
                                <div style={{fontSize: 10}}>{order?.item?.description.slice(0, 50)}</div>
                                <div style={{fontSize: 14, fontWeight: '500'}}>UGX {(order?.item?.price).toLocaleString()} <span style={{textDecoration: 'line-through', color: 'grey', fontWeight: 'normal', fontSize: 10}}>UGX {(order.item.globalPrice).toLocaleString()} </span></div>
                            </div>
                        </div>
                        <div onClick={() => addToFavorites(order.item)}><FaHeartCirclePlus size={22} color={'orange'}/></div>
                    </div>

                    {/* {item.discount && <div className='discount'>-{item.discount}%</div>} */}
                    <div className='btns'>
                        <div className='remove-btn'>
                            <MdDeleteOutline size={16} color={'orange'}/>
                            <span style={{color: 'orange', fontSize: 12, }} onClick={() => removeFromCart(order.item.itemID)}>Remove</span>
                        </div>
                        <div className='three-btns'>
                            <div className='itm-btn' style={{backgroundColor: quantity <= 1 && 'grey'}} onClick={() => reduceCart(order?.item)}>-</div>
                            <div className='count'>{quantity}</div>
                            <div className='itm-btn' onClick={() => incrementCart(order?.item)}>+</div>
                        </div>
                    </div>
                </div>
                )})
            }

            {cart.length == 0 && 
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 10, fontWeight: '600', color: 'rgba(0,0,0,0.6)'}}>
                    <div>Cart is empty</div>
                    <div style={{color: 'orange', }} onClick={() => navigate('/listings/All')}>Shop items to fill cart</div>
                </div>}
            {/* Mock Favourites header */}
            <div style={{paddingInline: 15, paddingBlock: 0, color: 'grey', fontSize: 10, fontWeight: '600'}}></div>

            {/* Favorites */}
            <div className='sec-1' style={{paddingBottom: 20, color: 'black', fontSize: 12}}>
                <div style={{paddingBlock: 10, color: 'black', fontSize: 12, fontWeight: '600'}}>Favorites</div>
                <div className='recom-section'>
                    <div className="recom-list">
                        {favorites?.map((item, index) => (
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
                                <img src={item?.coverPhoto} alt={item.name} height={'100%'} />
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
                <div style={{backgroundColor: 'orange', borderRadius: 3, width: '100%', marginInline: 10, cursor: 'pointer'}} className='inner-item' onClick={handleCheckoutCart}>CHECKOUT (UGX {tPrice.toLocaleString() })</div>
            </div>
            
            <Footer/>

        </div>
    )
}

export default Cart;