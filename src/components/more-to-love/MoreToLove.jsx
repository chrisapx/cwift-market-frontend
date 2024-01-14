import React from 'react';
import './MoreToLove.scss';
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


const MoreToLove = () => {

  const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };
      
  const promos = [
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
    {
      name: 'phones',
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
      delivery: false,
      img: 'src/assets/Speaker.png',
    },
    {
      name: 'phones',
      price: 234532,
      description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
      delivery: false,
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
        delivery: false,
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
      delivery: false,
      img: 'src/assets/iPhone12.png',
    },
    {
      name: 'phones',
      price: 234532,
      description: 'These styles will create a flex container for your item cards, and each card will take up 48% of the width, leaving some space between them.',
      delivery: true,
      img: 'src/assets/Laptop.png',
    },
  ];

  return (
    <div className="main-more-section">
      <div style={{ color: 'black', fontSize: 14, fontWeight: '700', paddingInline: 16, paddingTop: 16 }}>
        More to love
      </div>

      <div className="more-list">
        {promos.map((item, index) => (
          <div className="more-card" key={index} onClick={() => navigate('/details/' +1)}>
            <div className="more-image">
              <img src={item.img} alt={item.name} width={'100%'} />
            </div>
            <div className="more-details">
                <div style={{ fontSize: 14, fontWeight: '600', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{truncateText(item.description, 20)}</div>
                <div style={{color: 'black', fontSize: 14}}>UGX <span style={{fontSize: 20, color: 'black', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                <div style={{color: 'grey', fontSize: 14, textDecoration: 'line-through'}}>UGX <span style={{fontSize: 16, color: 'grey', fontWeight: '600'}}>{item.price.toLocaleString()}</span></div>
                <div style={{ fontSize: 14, fontWeight: '400', color: 'black', display: 'flex', gap: 7 }}>
                    Reviews
                    <span style={{color: 'orange'}}><TiStarFullOutline/></span>
                    <span style={{}}>{23}</span>
                </div>
                {item.delivery && <div style={{ fontSize: 14, fontWeight: '400', color: 'green', }}>Free delivery</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreToLove;
