import './Search.scss'
import { IoMdSearch } from "react-icons/io";

const Search = () => {
    return(
        <div className="search-bar">
            <IoMdSearch size={24} className="search-icon"/>
            <input placeholder='Search products, brands and categories' className='input-bar' style={{fontSize: 14}}/>
        </div>
    )
}

export default Search;