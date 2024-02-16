
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Listings.scss'; 
import Header from '../../components/header/Header';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/footer/Footer';
import { Rating } from 'react-simple-star-rating';
import { TbShoppingCartPlus } from 'react-icons/tb';

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
        <div style={{}} className="more-list">
          {items.map((item, index) => (
              <div key={index} className='item-card' style={{display: 'flex', flexDirection: 'column', color: 'black', padding: 3, lineHeight: 1, marginBlock: 6}} >
                  <div className='image-card' style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: 8, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate('/details/' + item.itemID )}>
                      {/* <img src={"src/assets/Headphones-Transparent-PNG.png"} height={'100%'}  style={{borderRadius: 5}}/> */}
                  </div>
                  <div style={{fontSize: 10, fontWeight: '500', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: 8}} onClick={() => navigate('/details/' + item.itemID )}>{item.name}</div>
                  <div style={{display: 'flex', fontSize: 10}}>
                    <Rating initialValue={2} fillColor='black' size={10} style={{}}/>
                    <div>({item.reviews[0]?.length})</div>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{fontSize: 12, whiteSpace: 'nowrap', color: 'orange', fontWeight: '700'}}><span style={{fontSize: 8}}>UGX</span> {(item.price)}</div>
                      <div style={{fontSize: 10, whiteSpace: 'nowrap', marginLeft: 5, color: 'grey' }}>50k+ <span style={{fontSize: 8}}>Sold</span></div>
                    </div>
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderRadius: 12, paddingInline: 7, paddingBlock: 3, marginRight: 4}}
                        onClick={() => handleAddToCart(item)}
                      >
                        <TbShoppingCartPlus size={14}/>
                      </div>
                  </div>
              </div>
            ))} 
      </div>
        {/* <div className="recom-list">
            {items.map((item, index) => (
            <div className="recom-card" key={index} >
                <div className="recom-image" onClick={() => navigate('/details/' + item.itemID)}>
                    <img src={item.coverPhoto} alt={item.name} height={'100%'}/>
                    <img src={item.coverPhoto.url} height={'100%'}/>
                </div>
                <div className="recom-details">
                    <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.name}</div>
                    <div style={{ fontSize: 12, fontWeight: '600', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} onClick={() => navigate('/details/' +item.itemID)}>{item.description ? item.description : ''}</div>
                    <div style={{color: 'black', fontSize: 12}}>UGX <span style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                    <div className='add-cart' onClick={() => handleAddToCart(item)}>ADD</div>
                </div>
            </div>
            ))}
        </div> */}
      </div>

      <Footer />
    </div>
  );
}

export default Listing;
