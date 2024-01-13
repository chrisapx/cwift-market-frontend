import AdBar from '../../components/add-bar/AddBar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import './Home.scss'

const Home = () => {
    return(
        <div className="main-page">
            <div className='ad-section'>
                <AdBar/>
            </div>
            <div className='head'>
                <Header/>
                <Search/>

            </div>

            <div className='foot'>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;