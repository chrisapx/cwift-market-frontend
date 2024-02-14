
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Listings.scss'; 
import Header from '../../components/header/Header';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/footer/Footer';

const Listing = () => {

  const [items, setItems] = useState([]);
  const [addCart, setAddCart] = useState(false);
  const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {

    document.title = "Nalmart - Explore Listings";

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

  const handleAddToCart = ( item ) => {
    addToCart( item );
    setAddCart(true);
    setTimeout(() => {
        setAddCart(false)
    }, 4000)
  }

  return (
    <div className="listings-container">
      {/* <title>Nalmart - Explore Listings</title> */}

      <meta name="description" content="Browse through a diverse collection of products on the Nalmart listings . Discover top-quality items in various categories such as electronics, fashion, home decor, and more. Find the perfect products from trusted sellers. Enjoy a seamless shopping experience with secure transactions and exclusive deals." />
      <div className='header-section'>
        <Header showBack={true} showSearch={true}/>
      </div>

      <div className='recom-section'>
        <div className="recom-list">
            {items.map((item, index) => (
            <div className="recom-card" key={index} >
                <div className="recom-image" onClick={() => navigate('/details/' + item.itemID)}>
                    <img src={item.coverPhoto} alt={item.name} height={'100%'}/>
                    {/* <img src={item.coverPhoto.url} height={'100%'}/> */}
                </div>
                <div className="recom-details">
                    <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.name}</div>
                    <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.description ? item.description : ''}</div>
                    <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                    <div className='add-cart' onClick={() => handleAddToCart(item)}>ADD</div>
                </div>
            </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Listing;
