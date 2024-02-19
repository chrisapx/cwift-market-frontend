import React, { useEffect, useState } from 'react';
import './MoreToLove.scss';
import { useNavigate } from 'react-router-dom';
import { GiSparkles, GiThunderStruck } from 'react-icons/gi';
import { TbRating12Plus, TbShoppingCartPlus } from 'react-icons/tb';
import { MdReviews } from 'react-icons/md';
import { PiPackage, PiStudent } from 'react-icons/pi';
import { LuPackage, LuPackageOpen } from 'react-icons/lu';
import { Rating } from 'react-simple-star-rating';
import { useCart } from '../../context/CartContext';
import { useListing } from '../../context/ListingContext';


const MoreToLove = () => {

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
  const { listing } = useListing();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategory = (category) => {
    if(category){
      setSelectedCategory('');
      setSelectedCategory(category);
    }
  }

    useEffect(() => {
      console.log(listing);
      setItems(listing);

    }, []);

    const handleAddToCart = (item) => {
      addToCart(item);
    }

    const moreCats = [
      {name: "All", icon: "" },
      {name: "Deals", icon: <GiThunderStruck size={12}/>},
      {name: "5-Star Rated", icon: <MdReviews size={12}/>},
      {name: "Valentine", icon: <PiStudent size={12}/>},
      {name: "Gifts", icon: <PiPackage size={12}/>},
      {name: "Offers", icon: <LuPackageOpen size={12}/>},
      {name: "Students Deals", icon: <PiStudent size={12}/>},
    ]
      
    
    return (
      <div className="main-more-section">
        <div style={{ color: 'black', fontSize: 12, fontWeight: '500', paddingInline: 8, }}>
          More to love
        </div>

        <div style={{display: 'flex', overflow: 'auto', flex: 1, alignItems: 'center', paddingInline: 10, marginBlock: 10, gap: 10}}>
            {moreCats?.map((item, index) => (
                <div key={index} onClick={() => handleCategory(item.name)} style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: 3, fontSize: 12, color: selectedCategory === item.name? 'black' : 'grey', fontWeight: '600', borderBottomStyle: selectedCategory === item.name&& 'solid', borderBottomColor: 'black' }}>
                  <div>{item?.icon}</div>
                  <div>{item?.name}</div>
                </div>
            ))}
        </div>

          <div style={{}} className="more-list">
              {items.map((item, index) => (
                  <div key={index} className='item-card' style={{display: 'flex', flexDirection: 'column', color: 'black', padding: 3, lineHeight: 1, }} >
                      <div className='image-card' style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: 8, width: '100%', padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate('/details/' + item.itemID )}>
                          <img src={item?.coverPhoto?.url} height={'100%'} width={'100%'}  style={{borderRadius: 5, objectFit: 'contain'}}/>
                      </div>
                      <div style={{fontSize: 14, fontWeight: '500', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: 8}} onClick={() => navigate('/details/' + item.itemID )}>{item.name}</div>
                      <div style={{display: 'flex', fontSize: 10}}>
                        <Rating initialValue={item.reviews[0]?.rating} fillColor='black' size={12} style={{}}/>
                        <div>({item.reviews?.length})</div>
                      </div>

                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div style={{fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', color: 'orange', fontWeight: '700'}}><span style={{fontSize: 10}}>UGX</span> {item.price.toLocaleString()}</div>
                          <div style={{fontSize: 12, whiteSpace: 'nowrap',overflow: 'hidden', marginLeft: 5, color: 'grey' }}>{item.stockCount}k+ <span style={{fontSize: 10}}>Sold</span></div>
                        </div>
                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderRadius: 12, paddingInline: 7, paddingBlock: 3, marginRight: 4}}
                            onClick={() => handleAddToCart(item)}
                          >
                            <TbShoppingCartPlus size={16}/>
                          </div>
                      </div>
                  </div>
                ))} 
          </div>
    </div>
  );
};

export default MoreToLove;