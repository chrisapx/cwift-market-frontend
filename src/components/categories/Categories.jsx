import { useNavigate } from 'react-router-dom'
import './Categories.scss'
import { FaChevronRight } from 'react-icons/fa';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { HiMiniChevronDoubleRight } from 'react-icons/hi2';
import { LuChevronRight } from 'react-icons/lu';

const Categories = () => {
    
    const navigate = useNavigate();


    const categories = [ 

        {name: 'Lighting', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flighting.jpeg57e8c991-b2f3-4dc8-b493-6eff339937a1?alt=media&token=dbf37ac9-6308-414a-8630-6e02f7055bc2', offers: "Popular Gifts"},
        {name: 'Headphones, EarBuds & Accessories ', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fh%26ebuds.jpeg6fe4d50a-cb95-4f5d-b840-d0c4f119dab1?alt=media&token=b7dcd69a-aa28-4183-9ec3-461fadda463e', offers: "From UGX 20K"},
        {name: 'Camera & Photo', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcamera%26photo.jpegc2ff6931-8d31-4aa8-8190-140ac6a178cf?alt=media&token=75ca5891-d1a8-4a65-9c58-d2c6f33319b8', offers: "Popular Gifts"},
        {name: 'Audio & Radio', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fo%26radio.jpeg802de16c-0c95-4c3b-9b21-47d97d2f5b99?alt=media&token=29274414-6f44-44f9-88a9-90ec479903fd', offers: "Up to 70% off"},
        {name: 'Phones & Tablets', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fphones%26tablets.jpege11f25e3-1ece-464c-9ea2-63aebaf997ef?alt=media&token=4d8d3500-2a20-4d64-bacf-f83c7d4e5d37', offers: "Popular Gifts"},
        {name: 'Laptops', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Flaptops.jpeg72efff1c-1047-4d8f-aac5-844d1acd8622?alt=media&token=0f5cad92-0a3a-41b5-b066-ce3431243b91', offers: "Up to 70% off"},
        {name: 'Data Storage', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fdatastorage.jpeg1ecaabce-4d5a-4803-a93d-ad4448f338ff?alt=media&token=10fb62e6-3a22-45af-a648-dfc31c0be1d8', offers: "Up to 70% off", offers: "Popular Gifts"},
        {name: 'keyboards, Mice & Accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fkeybord%26mice.jpeg2712e463-b8c2-456e-a314-014f1adb47c7?alt=media&token=536b73bd-479d-4d95-b0e0-e2780e3f480f', offers: "Popular Gifts"},
        {name: 'Video Games', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fvideogames.jpegc8b30ba4-ee4a-405f-b4a8-9c463aff6a8e?alt=media&token=9af682e2-5029-49f9-a817-873273844023', offers: "From 10K"},
        {name: 'Hubs & Adapters', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fhubd%26adapters.jpegdca98b95-8dbe-4f14-8064-f5db139c20ca?alt=media&token=fbec11d9-ed01-43db-9ba7-4546524055a5', offers: "From 10K"},
        {name: 'Computer accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fcomputing.jpeg4eb42784-1576-4346-89d3-0f7c243d27d7?alt=media&token=dfe12355-fdd0-442b-8690-51cdd33d539d', offers: "Popular Gifts"},
        {name: 'Batteries & Accessories', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fbattery.jpegfd2e6ca5-aaec-48f4-a242-6cdd2496e668?alt=media&token=1378a309-80ea-42ea-a9ee-647f3f4e972f'},
        {name: 'USB Gadgets', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2Fusbgadets.jpeg3ac2767d-b0ed-4218-8e0b-a250548a59ef?alt=media&token=7269fe11-f6d4-4e9d-8a0b-afc05c705a72', offers: "From 10K"},
        {name: 'power Strips', image: 'https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2FpowerStrips.jpeg3380279e-d7bc-44ad-b915-4a549b864b3e?alt=media&token=0083bba6-c589-4032-b92d-e38b0f9094ad', offers: "Popular Gifts"},

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
                       index%2 ==0 && <div key={index} className='category-card' style={{width: 60, lineHeight: 1, textAlign: 'center', paddingInline: 10, fontSize: 14, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/* Image */}
                            <div style={{width: 60, height: 60,  backgroundColor: 'whites', objectFit: 'contain', position: 'relative', borderRadius: 50, borderStyle: 'solid', borderWidth: 1, borderColor: 'grey'}}>
                                <img src={cat.image}  width={'100%'} height={'100%'} style={{borderRadius: 50, objectFit: 'cover'}} />
                            </div>
                            {/* Offers */}
                            <div style={{ position: 'relative', bottom: 8,  fontSize: 10, backgroundColor: 'white', color: 'orange', fontWeight: '700', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{cat.offers}</div>
                            {/* Name */}
                            <div style={{position: 'relative', bottom: 2, fontWeight: '400', color: 'black', lineHeight: 1}}>{cat.name}</div>
                        </div>     
                    ))}
                    
                </div>

                <div className='category-section' style={{display: 'flex', overflow: 'scroll',msOverflowStyle: 'none', scrollbarWidth: 'none', gap: 12, paddingLeft: 8, marginBottom: 10}}>
                    {categories.map((cat, index) => (
                       index%2 != 0 && <div key={index} className='category-card' style={{width: 60, lineHeight: 1, textAlign: 'center', paddingInline: 10, fontSize: 14, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/* Image */}
                            <div style={{width: 60, height: 60,  backgroundColor: 'whites', objectFit: 'contain', position: 'relative', borderRadius: 50, borderStyle: 'solid', borderWidth: 1, borderColor: 'grey'}}>
                                <img src={cat.image}  width={'100%'} height={'100%'} style={{borderRadius: 50, }}/>
                            </div>
                            {/* Offers */}
                            <div style={{ position: 'relative', bottom: 8,  fontSize: 10, backgroundColor: 'white', color: 'orange', fontWeight: '700', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{cat.offers}</div>
                            {/* Name */}
                            <div style={{position: 'relative', bottom: 2, fontWeight: '400', color: 'black', lineHeight: 1}}>{cat.name}</div>
                        </div>     
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Categories;