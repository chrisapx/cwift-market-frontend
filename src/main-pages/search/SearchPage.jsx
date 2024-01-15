import { FaBars, FaRegUser, FaSearch } from 'react-icons/fa';
import { FaAngleLeft } from "react-icons/fa6";
import './SearchPage.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

    const navigate = useNavigate();

    const [showHistory, setShowHistory] = useState(true);
    const [showSuggestion, setShowSuggestion] = useState(false);

    const history = [
        {name: 'laptops'},
        {name: 'iphone'},
        {name: 'Infinix'},
        {name: 'JBL'},
        {name: 'Hagger socket'},
        {name: 'Switches'},
        {name: 'Bulb'},
        {name: 'cahger'},
        {name: 'USB '},
        {name: 'Hisense'},
    ]

    const handleFocus = () => {
        setShowHistory(false)
        setShowSuggestion(true);
    }

    return(
        <div className="main-search-page">
            <div className='bar'>
                <FaAngleLeft size={30} color={'grey'} onClick={() => navigate(-1)}/>
                <input type="search" placeholder="Search..." className='input-bar' color='black' onFocus={handleFocus} />
                <FaSearch size={30} color={'grey'} onClick={() => navigate('/search-results')}/>
            </div>

            {showHistory && <div style={{color: 'black', fontWeight: '500', paddingInline: 10}}>Discover more</div>}

            {showHistory && <div className='history'>
                {history.map((item, index) => (
                    <div className='history-item'>{item.name}</div>
                ))}
            </div>}

            {showSuggestion && 
            <div className='suggestion'>
                {history.map((item, index) => (
                    <div className='suggestion-item'>{item.name}</div>
                ))}
            </div>}
        </div>
    )
}

export default SearchPage;