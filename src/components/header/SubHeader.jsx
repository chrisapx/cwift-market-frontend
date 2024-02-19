import { useEffect, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { MdApproval, MdCommit } from "react-icons/md";
import { PiLightningFill } from "react-icons/pi";
import './SubHeader.scss'
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { upperCats } from "../../global/Helper";
import { useListing } from "../../context/ListingContext";


export default function SubHeader() {

    const { listing } = useListing();
    const [deals, setDeals] = useState();
    const [selected, setSelected] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        setDeals(listing);
        console.log(listing);
    },[])

    const handleSelected = ( select ) => {
        if(select){
            setSelected('');
            setSelected(select);
        }
        navigate('/listings/' + select)
    }
    
    return(
        <div className="sub-header-frame">
            {/* Horizontal scroll categories */}
            <div className='upper-cat'>
                {upperCats.map((cat, index) => (
                    <div key={index} style={{paddingBlock: 0, borderBottomStyle: selected === cat.name &&  'solid', fontWeight: selected === cat.name ? 'bold' : '400' , color: selected === cat.name ? 'black' : 'rgba(0, 0, 0, 0.8)'}} onClick={() => handleSelected(cat.name)}>{cat.name}</div>
                    ))}
            </div>

            <div style={{display: 'flex', flex: 1, justifyContent: 'space-evenly', paddingBlock: 10, backgroundColor: "rgb(255, 244, 223)", height: 35, borderRadius: 4 }}>
                <div style={{display: 'flex', flex: 1, flexDirection: 'column', borderRightStyle: 'solid', borderRightColor: 'grey', borderRightWidth: 1, alignItems: 'center'}}>
                    <div style={{ fontSize: 12, color: 'green', fontWeight: '600', }}><span style={{paddingRight: 4}}><MdApproval/></span>Free shipping</div>
                    <div style={{ fontSize: 10, color: 'grey'}}>Limited-time offer</div>
                </div>
                <div style={{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: 'black', fontWeight: '600', }}><span style={{paddingRight: 4}}><TbTruckDelivery /></span>Delivery guarantee</div>
                    <div style={{ fontSize: 10, color: 'grey'}}>Refund for any issues</div>
                </div>
            </div>{/* Search bar */}
            

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',  backgroundColor: "green", color: 'white', paddingBlock: 2, marginTop: 8, borderRadius: 5, paddingInline: 10 }}>
                <div style={{fontWeight: 'bold', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5}}> <span><MdCommit size={18}/></span>Nalmart's Commitments</div>
                <div style={{fontWeight: '500', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5}}>  safe payment <span><IoChevronForwardOutline size={10}/></span></div>
            </div>

            <div style={{color: 'black', display: 'flex', justifyContent: 'space-between', paddingBlock: 8, fontSize: 12}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'}}><span><PiLightningFill size={12}/></span>Sparking deals<span><IoChevronForwardOutline size={14}/></span></div>
                <div style={{paddingRight: 5}}>Limited time offer</div>
            </div>


            <div style={{display: 'flex', gap: 8, overflow: 'auto'}}>
                {/* Item  listing section */}
                {deals?.map((item, index) => (
                    <div key={index} style={{width: 100, height: 'fit-content', color: 'black', }} onClick={() => navigate('/details/' + item.itemID )}>
                        {/* Image section */}
                        <div style={{height: 100, width: 100, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: 5}}>
                            <img src={item?.coverPhoto?.url} height={'100%'} width={'100%'} style={{borderRadius: 5, objectFit: 'contain'}}/>
                        </div>
                        {/* details section */}
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingBlock: 6}}>
                            <div style={{fontSize: 12, whiteSpace: 'nowrap', color: 'orange', fontWeight: '700'}}><span style={{fontSize: 8}}>UGX</span> {(item.price/1000).toFixed(0)}K</div>
                            <div style={{fontSize: 12, whiteSpace: 'nowrap', }}>{(item?.stockCount/1000).toFixed(0)}k+ <span style={{fontSize: 8}}>Sold</span></div>
                        </div>

                        <div style={{position: 'relative', bottom: 46, fontWeight: '700',width: 'fit-content',padding: 2, paddingInline: 6, fontSize: 8, left: 0, backgroundColor: '#c83f49', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', color: 'white', borderBottomRightRadius: 15, borderTopLeftRadius: 15}}>12% OFF</div>

                    </div>
                ))}
            </div>

        </div>
    )
}