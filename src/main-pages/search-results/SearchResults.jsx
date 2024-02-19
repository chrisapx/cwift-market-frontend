import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './SearchResults.scss'
import { useEffect, useState } from 'react';
import { useListing } from '../../context/ListingContext';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { Rating } from 'react-simple-star-rating';
import { useCart } from '../../context/CartContext';
import { upperCats } from '../../global/Helper';

const SearchResults = () => {

    const { listing } = useListing();
    const { input } = useParams();
    const navigate = useNavigate();
    const { cartItems,totalPrice, addToCart, removeFromCart } = useCart();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const filteredResults = filterItems(listing, input);
        setItems(filteredResults);
    }, [input, listing]);

    const [selected, setSelected] = useState('All');

    const handleSelected = ( select ) => {
        if(select){
            setSelected('');
            setSelected(select);
        }
        navigate('/listings/' + select)
    }

    const handleAddToCart = ( item ) => {
        addToCart( item );
        setAddCart(true);
        setTimeout(() => {
            setAddCart(false)
        }, 4000)
    }

    function filterItems(items, keyword) {
        const filteredItems = [];

        items.forEach(item => {
            let rank = 0;

            if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
                rank += 5;
            }

            if (keyword?.toLowerCase() === item.category?.toLowerCase() ||
                keyword?.toLowerCase() === item.brand?.toLowerCase() ||
                keyword?.toLowerCase() === item.store?.toLowerCase() ||
                keyword?.toLowerCase() === item.vendorName?.toLowerCase()) {
                rank += 4;
            }

            item.details.forEach(detail => {
                if (keyword?.toLowerCase() === detail.name?.toLowerCase() ||
                    keyword?.toLowerCase() === detail.value?.toLowerCase()) {
                    rank += 3;
                }
            });

            if (rank === 0 && item.name.toLowerCase().includes(keyword.toLowerCase())) {
                rank += 2;
            }

            if (rank === 0) {
                item.details.forEach(detail => {
                    if (detail.name?.toLowerCase().includes(keyword?.toLowerCase()) ||
                        detail.value?.toLowerCase().includes(keyword?.toLowerCase())) {
                        rank += 1;
                    }
                });
            }

            if (rank > 0) {
                filteredItems.push({ item, rank });
            }
        });

        filteredItems.sort((a, b) => b.rank - a.rank);

        return filteredItems.map(filteredItem => filteredItem.item);
    }

    return (
        <div className='main-results-section'>
            <div style={{position: 'sticky', top: 0, backgroundColor: 'white'}}>
                <Header showBack={true}/>
            </div>

            <div className='upper-categs'>
                {upperCats.map((cat, index) => (
                <div key={index} style={{paddingBlock: 0, borderBottomStyle: selected === cat.name &&  'solid', fontWeight: selected === cat.name ? 'bold' : '400' , color: selected === cat.name ? 'black' : 'rgba(0, 0, 0, 0.8)'}} onClick={() => handleSelected(cat.name)}>{cat.name}</div>
                ))}
            </div>

            <div style={{paddingInline: 5, paddingBlock: 10, fontSize: 14, fontWeight: '500'}}>Search results</div>
            
            {items.length == 0 && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, color: 'grey', paddingBlock: 30}}>No results found</div>}

            <div className='recom-section'>
                <div style={{}} className="more-list">
                {items.map((item, index) => (
                    <div key={index} className='item-card' style={{display: 'flex', flexDirection: 'column', color: 'black', padding: 3, lineHeight: 1, marginBlock: 6}} >
                        <div className='image-card' style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: 8, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate('/details/' + item.itemID )}>
                            <img src={item?.coverPhoto?.url} height={'100%'} width={'100%'} style={{objectFit: 'contain', borderRadius: 5}}/>
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
                    ))} 
                </div>
            </div>

            {/* Based on past history */}
            <div style={{ paddingInline: 5, paddingBlock: 20, fontSize: 14, fontWeight: '500'}}>Based on search History</div>

            <div style={{display: 'flex', gap: 8, overflow: 'auto'}}>
                {/* Item  listing section */}
                {listing?.map((item, index) => (
                    <div key={index} style={{width: 100, height: 'fit-content', color: 'black', }} onClick={() => navigate('/details/' + item.itemID )}>
                        {/* Image section */}
                        <div style={{height: 100, width: 100, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: 5}}>
                            <img src={item?.coverPhoto?.url} height={'100%'} width={'100%'} style={{borderRadius: 5, objectFit: 'contain'}}/>
                        </div>
                        {/* details section */}
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingBlock: 6}}>
                            <div style={{fontSize: 12, whiteSpace: 'nowrap', color: 'orange', fontWeight: '700'}}><span style={{fontSize: 8}}>UGX</span> {(item.price/1000).toFixed(0)}K</div>
                            <div style={{fontSize: 12, whiteSpace: 'nowrap', }}>{(item?.itemCount/1000).toFixed(0)}k+ <span style={{fontSize: 8}}>Sold</span></div>
                        </div>
                    </div>
                ))}
            </div>

                    
            <footer style={{position: 'relative', bottom: 0}}>
                <Footer/>
            </footer>
        </div>
    )
}

export default SearchResults;
