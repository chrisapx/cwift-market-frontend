import './Search.scss'
import { IoMdSearch } from "react-icons/io";

const Search = () => {
    return(
        <div className="search-section">
            <div className='search-bar'>
                <IoMdSearch size={20} className="search-icon"/>
                <input placeholder='Search products, brands and categories' className='input-bar' style={{fontSize: 12}}/>
            </div>
        </div>
    )
}

export default Search;