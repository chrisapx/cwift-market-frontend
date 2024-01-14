import { useNavigate } from 'react-router-dom';
import './Search.scss'
import { IoMdSearch } from "react-icons/io";

const Search = () => {
    const navigate = useNavigate();

    const handleFocus = () => {
        navigate('search')
        // Navigate to the search page with focus on
    }
    return(
        <div className="search-section">
            <div className='search-bar'>
                <IoMdSearch size={24} className="search-icon"/>
                <input placeholder='Search products, brands and categories' className='input-bar' style={{fontSize: 14}} onFocus={handleFocus}/>
            </div>
        </div>
    )
}

export default Search;