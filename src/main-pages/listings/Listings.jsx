
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Listings.scss'; 
import Header from '../../components/header/Header';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/footer/Footer';
import { Rating } from 'react-simple-star-rating';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { useListing } from '../../context/ListingContext';
import { upperCats } from '../../global/Helper';
import { TiTick } from 'react-icons/ti';

const Listing = () => {

  const { category } = useParams();
  const { listing } = useListing();
  const [ currentCategory, setCurrentCategory ] = useState(category);
  const [ items, setItems ] = useState([]);
  const [ addCart, setAddCart ] = useState(false);
  const [ selected, setSelected ] = useState(category);
  const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if(currentCategory === 'All' || currentCategory === null || currentCategory === ''){
      setItems(listing);
    }else{
      setItems(listing?.filter(list => list?.category === currentCategory));
    }

    // setItems(listing);
  }, [currentCategory]);
  
  
  const handleSelected = ( select ) => {
    if(select){
      setSelected('');
      setSelected(select);
      setCurrentCategory(select);
    }
    // navigate('/listings/' + select)
  }
  
  const handleAddToCart = ( item ) => {
    addToCart( item );
    setAddCart(true);
    setTimeout(() => {
      setAddCart(false)
    }, 1000)
  }
  
  useEffect(() => {
    document.title = "Nalmart - Explore " + currentCategory +" Listings";
    
  },[])

  return (
    <div className="listings-container">
      {/* <title>Nalmart - Explore Listings</title> */}

      <meta name="description" content="Browse through a diverse collection of products on the Nalmart listings . Discover top-quality items in various categories such as electronics, fashion, home decor, and more. Find the perfect products from trusted sellers. Enjoy a seamless shopping experience with secure transactions and exclusive deals." />
      <div className='header-section'>
        <Header showBack={true} showSearch={true}/>
      </div>

      {addCart && 
          <div className='add-cart'>
              <TiTick size={20} />
              <span>Item successfuly added to cart</span>
          </div>
      }

      {/* Horizontal scroll categories */}
      <div className='upper-categs'>
        {upperCats.map((cat, index) => (
          <div key={index} style={{paddingBlock: 0, borderBottomStyle: selected === cat.name &&  'solid', fontWeight: selected === cat.name ? 'bold' : '400' , color: selected === cat.name ? 'black' : 'rgba(0, 0, 0, 0.8)'}} onClick={() => handleSelected(cat.name)}>{cat.name}</div>
          ))}
      </div>

      <div className='recom-section'>
        <div style={{}} className="more-list">
          {items.map((item, index) => items.length != 0 ? (
              <div key={index} className='item-card' style={{display: 'flex', flexDirection: 'column', color: 'black', padding: 3, lineHeight: 1, marginBlock: 6}} >
                  <div className='image-card' style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: 8, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate('/details/' + item.itemID )}>
                      { item.coverPhoto ? 
                        <img src={item?.coverPhoto?.url} height={'100%'} width={'100%'} style={{objectFit: 'contain', borderRadius: 5}}/> :
                        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12}}>No image</div>
                      }
                  </div>
                  <div style={{fontSize: 14, fontWeight: '500', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: 8}} onClick={() => navigate('/details/' + item.itemID )}>{item.name}</div>
                  <div style={{display: 'flex', fontSize: 12}}>
                    <Rating initialValue={item.reviews[0]?.rating} fillColor='orange' size={12} style={{}}/>
                    <div>({item.reviews?.length})</div>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{fontSize: 12, whiteSpace: 'nowrap', color: 'orange', fontWeight: '700'}}><span style={{fontSize: 8}}>UGX</span> {(item.price.toLocaleString())}</div>
                      <div style={{fontSize: 10, whiteSpace: 'nowrap', marginLeft: 5, color: 'grey' }}>{item.itemCount}k+ <span style={{fontSize: 8}}>Sold</span></div>
                    </div>
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderRadius: 12, paddingInline: 7, paddingBlock: 3, marginRight: 4}}
                        onClick={() => handleAddToCart(item)}
                      >
                        <TbShoppingCartPlus size={14}/>
                      </div>
                  </div>
              </div>
            ): (
              <div>List is empty</div>
            )
            )} 
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Listing;
