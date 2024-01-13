import './Footer.scss'
// import { FaBars, FaRegUser } from 'react-icons/fa';
import { MdArrowDropUp } from "react-icons/md";


const Footer = () => {
    return(
        <div className="main-footer">
            
            <div className="one">
                <MdArrowDropUp size={20} color={'grey'}/>
                <div>TOP OF PAGE</div>
            </div>

            <div className="two">
                <p>cwiftmarketplace.com</p>
                <p>CONTACT US</p>
                <p>HELP CENTER</p>
                <p>CHAT WITH US</p>
                <p>REPORT A PRODUCT</p>
                <p>SELL WITH CWIFT</p>

            </div>

            <div className="three">
                All rights reserved
            </div>

        </div>
    )
}

export default Footer;