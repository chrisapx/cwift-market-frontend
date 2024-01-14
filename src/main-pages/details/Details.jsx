import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './Details.scss'

const Details = () => {
    
    const images = [
        {img: "src/assets/iPhone12.png"},
        {img: "src/assets/iPhone12.png"},
        {img: "src/assets/iPhone12.png"},
        {img: "src/assets/iPhone12.png"},
    ]
    
    return(
        <div className='main-details-section'>
            <div className='header-sec'>
                <Header showBack={true} showSearch={true}/>
            </div>

            <div className='images-container'>
                {images.map((imge, index) => (

                <div className='image-card'>
                    <img src='src/assets/Laptop.png' alt='iPhone12' height={'100%'} width={'100%'}/>
                </div>
                ))}
            </div>

            <div className='sec-1'>

                <div style={{fontSize: 10, backgroundColor: 'blue', width: 'fit-content', padding: 1, color: 'white', fontWeight: '600', marginBlock: 10, borderRadius: 1}}>Official store</div>
                <div style={{fontSize: 14}}>Tecno Pop 7 - 6.6" 2GB RAM 64GB ROM 8MP 5000mAh - Black</div>
                <div style={{fontSize: 12}}>Brand: <span style={{color: 'blue'}}>Tecno</span></div>

            </div>

            <div className='add-to-cart'>
                    <div style={{backgroundColor: 'orange', borderTopLeftRadius: 30, borderBottomLeftRadius: 30}} className='add-item'>Add to cart</div>
                    <div style={{backgroundColor: 'red', borderTopRightRadius: 30, borderBottomRightRadius: 30}} className='add-item'>Buy now</div>
            </div>

            <div className='footer-section'>
                <Footer/>
            </div>

        </div>
    )
}

export default Details;