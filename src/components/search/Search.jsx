import { useNavigate } from 'react-router-dom';
import './Search.scss'
import { IoMdSearch } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import { TbFlagSearch } from 'react-icons/tb';
import { HiSearch } from 'react-icons/hi';

const Search = () => {
    const navigate = useNavigate();

    const handleFocus = () => {
        navigate('/search')
        // Navigate to the search page with focus on
    }
    return(
        <div className="search-section">
            <div className='search-bar'>
                <HiSearch size={18} color={'grey'} className="search-icon"/>
                <input placeholder='Search...' className='input-bar' style={{fontSize: 10}} onFocus={handleFocus}/>
            </div>
        </div>
    )
}

export default Search;