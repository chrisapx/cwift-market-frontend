import { useNavigate } from 'react-router-dom'
import './Categories.scss'
import { FaChevronRight } from 'react-icons/fa';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { HiMiniChevronDoubleRight } from 'react-icons/hi2';
import { LuChevronRight } from 'react-icons/lu';

const Categories = () => {
    
    const navigate = useNavigate();


    const categories = [ 
        {name: "Home & Kitchen", image: "src/assets/download.jpeg", offers: "Popular Gifts"},
        {name: "Toy & Baby", image: "src/assets/download.jpeg", offers: "From UGX 20K"},
        {name: "Auto Mobile", image: "src/assets/download.jpeg", offers: "Popular Gifts"},
        {name: "OutDoor", image: "src/assets/download.jpeg", offers: "Up to 70% off"},
        {name: "Electronics", image: "src/assets/elctronics.jpeg", offers: "Popular Gifts"},
        {name: "Computing", image: "src/assets/computing.jpeg", offers: "Up to 70% off"},
        {name: "Phones & Tablets", image: "src/assets/download.jpeg", offers: "Up to 70% off"},
        {name: "Office Appliances", image: "src/assets/download.jpeg", offers: "Popular Gifts"},
        {name: "Bathroom", image: "src/assets/download.jpeg", offers: "Popular Gifts"},
        {name: "Heaters", image: "src/assets/download.jpeg", offers: "Up to 70% off"},
        {name: "Lighting", image: "src/assets/download.jpeg", offers: "Popular Gifts"},
        {name: "Furniture", image: "src/assets/download.jpeg", offers: "Up to 70% off"},
        {name: "Security", image: "src/assets/download.jpeg", offers: "From 10K"},
        {name: "Automation", image: "src/assets/download.jpeg", offers: "Up to 70% off"},
        // 'Home & Kitchen', 'Toy & Baby', 'Automobile', 'Outdoor', 'Computing' , 
        //                  'Phones & Laptops', 'Office appliances' 
    ]
    return(
        <div className="categories-frame">
            {/* <div className='cat-frame'>
                {categories.map((cat, index) => (
                    <div className='cart-card' style={{width: 100}} onClick={() => navigate('/listings')}>
                        <div className='cat-image'>
                            <img src='src/assets/Headphones-Transparent-PNG.png' width={'100%'} />
                        </div>
                        <div className='cat-text'>{cat}</div>
                    </div>
                ))
                }
            </div> */}
            <div style={{fontWeight: '500', fontSize: 12, paddingInline: 8, display: 'flex', alignItems: 'center', marginBlock: 10,}}>
                <div>Categories</div> 
                <LuChevronRight /></div>
            <div>
                <div className='category-section' style={{display: 'flex', overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none', gap: 12, paddingLeft: 8, marginBottom: 10, height: 'fit-content'}}>
                    {categories.map((cat, index) => (
                       index%2 ==0 && <div key={index} className='category-card' style={{width: 60, lineHeight: 1, textAlign: 'center', paddingInline: 10, fontSize: 12, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/* Image */}
                            <div style={{width: 60, height: 60,  backgroundColor: 'whites', objectFit: 'contain', position: 'relative', borderRadius: 50, borderStyle: 'solid', borderWidth: 1, borderColor: 'grey'}}>
                                <img src={cat.image}  width={'100%'} height={'100%'} style={{borderRadius: 50, }}/>
                            </div>
                            {/* Offers */}
                            <div style={{ position: 'relative', bottom: 8,  fontSize: 8, backgroundColor: 'white', color: 'orange', fontWeight: '700', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{cat.offers}</div>
                            {/* Name */}
                            <div style={{position: 'relative', bottom: 2, fontWeight: '500', color: 'black', lineHeight: 1}}>{cat.name}</div>
                        </div>     
                    ))}
                    
                </div>

                <div className='category-section' style={{display: 'flex', overflow: 'scroll',msOverflowStyle: 'none', scrollbarWidth: 'none', gap: 12, paddingLeft: 8, marginBottom: 10}}>
                    {categories.map((cat, index) => (
                       index%2 != 0 && <div key={index} className='category-card' style={{width: 60, lineHeight: 1, textAlign: 'center', paddingInline: 10, fontSize: 12, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/* Image */}
                            <div style={{width: 60, height: 60,  backgroundColor: 'whites', objectFit: 'contain', position: 'relative', borderRadius: 50, borderStyle: 'solid', borderWidth: 1, borderColor: 'grey'}}>
                                <img src={cat.image}  width={'100%'} height={'100%'} style={{borderRadius: 50, }}/>
                            </div>
                            {/* Offers */}
                            <div style={{ position: 'relative', bottom: 8,  fontSize: 8, backgroundColor: 'white', color: 'orange', fontWeight: '700', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{cat.offers}</div>
                            {/* Name */}
                            <div style={{position: 'relative', bottom: 2, fontWeight: '500', color: 'black', lineHeight: 1}}>{cat.name}</div>
                        </div>     
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Categories;