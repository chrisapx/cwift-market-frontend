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