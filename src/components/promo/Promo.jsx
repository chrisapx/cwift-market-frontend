import { useState } from 'react';
import './Promo.scss'
import { FaBars, FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



const Promo = () => {

    const navigate = useNavigate();

    const promos = [
        {
            name: 'phones',
            img: 'src/assets/iPhone12.png'
        },
        {
            name: 'phones',
            img: 'src/assets/Laptop.png'
        },
        {
            name: 'phones',
            img: 'src/assets/Speaker.png'
        },
        {
            name: 'phones',
            img: 'src/assets/iPhone12.png'
        },
        {
            name: 'phones',
            img: 'src/assets/Laptop.png'
        },
        {
            name: 'phones',
            img: 'src/assets/Speaker.png'
        },
        {
            name: 'phones',
            img: 'src/assets/iPhone12.png'
        },
        {
            name: 'phones',
            img: 'src/assets/Laptop.png'
        }
    ]

    return(
        <div className="main-promo-section" >

            <div style={{display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: '700', paddingInline: 16, paddingTop: 16}}>
                <div>New year sale</div>
                <FaArrowRight/>
            </div>

            <div style={{fontSize: 14, fontWeight: '400', paddingInline: 16, paddingBottom: 12}}>Ends: 00: 01 : 00</div>
            <div className='c-list'>
                {promos.map((item, index) => (
                    <div className='promo-card' key={index} onClick={() => navigate('/listings')}>
                        <div style={{height: 70, paddingTop: 8, }}>
                            <img src={item.img} height={'100%'} loading='lazy'/>
                        </div>
                        <div style={{fontSize: 12, fontWeight: '600', color: 'black', paddingBlock: 8}}>{item.name}</div>
                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default Promo;