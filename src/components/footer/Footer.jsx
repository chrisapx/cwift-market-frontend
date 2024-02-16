import { useNavigate } from 'react-router-dom';
import './Footer.scss'
// import { FaBars, FaRegUser } from 'react-icons/fa';
import { MdArrowDropUp } from "react-icons/md";


const Footer = () => {

    const navigate = useNavigate();
   
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    }
    return(
        <div className="main-footer">
            
            <div className="one" onClick={scrollToTop}>
                <MdArrowDropUp size={20} color={'grey'}/>
                <div >TOP OF PAGE</div>
            </div>

            <div className="two">
                <p className='footer-item' onClick={() => navigate('/')}>nalmart.com</p>
                <p className='footer-item' onClick={() => navigate('/')}>CONTACT US</p>
                <p className='footer-item' onClick={() => navigate('/')}>HELP CENTER</p>
                <p className='footer-item' onClick={() => navigate('/')}>CHAT WITH US</p>
                <p className='footer-item' onClick={() => navigate('/')}>REPORT A PRODUCT</p>
                <p className='footer-item' onClick={() => {navigate('/admin-home/')}}>SELL WITH NALMART</p>
            </div>

            <div className="three">
                All rights reserved
            </div>

        </div>
    )
}

export default Footer;