import AdBar from '../../components/add-bar/AddBar';
import Categories from '../../components/categories/Categories';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import SubHeader from '../../components/header/SubHeader';
import MoreToLove from '../../components/more-to-love/MoreToLove';
import Promo from '../../components/promo/Promo';
import Search from '../../components/search/Search';
import './Home.scss'

const Home = () => {

    return(
        <div className="main-home-page">
            <title>Nalmart</title>
            {/* <div className='ad-section'>
                <AdBar/>
            </div> */}
            
            <div className='header-section'>
                <Header/>
            </div>
            <div className='sub-header'>
                <SubHeader/>
            </div>
            <div style={{}}>
                <img src="https://firebasestorage.googleapis.com/v0/b/cwift-marketplace.appspot.com/o/item-images%2F98658cdd-c5e8-4603-9ea7-b6c254e66e7d.png26c5f385-74e8-4220-8b5a-6e06be571dbf?alt=media&token=2198a089-369e-4d50-9bfb-afa7f242f695" width={'100%'} style={{objectFit: 'contain'}}/>
            </div>

            <div className='main-body'>
                <div >
                    <Categories/>
                </div>
                {/* <div>
                    <Promo/>
                </div> */}
                <div>
                    <MoreToLove/>
                </div>

            </div>

            <div className='foot'>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;