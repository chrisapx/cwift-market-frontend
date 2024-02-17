import { FaSearch } from 'react-icons/fa';
import { FaAngleLeft } from "react-icons/fa6";
import './SearchPage.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListing } from '../../context/ListingContext';

const SearchPage = () => {

    const navigate = useNavigate();
    const { listing, addToSearchHistory, getSearchHistory  } = useListing();

    const [showHistory, setShowHistory] = useState(true);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setShowHistory(true);
        setItems(listing);
        setSearchHistory(getSearchHistory())
    }, []);

    function suggestItems(items, userInput) {
        const startMatches = [];
        const otherMatches = [];

        items.forEach(item => {
            const lowerCaseItem = item.name.toLowerCase(); 
            const lowerCaseInput = userInput.toLowerCase();
            if (lowerCaseItem.startsWith(lowerCaseInput)) {
                startMatches.push(item.name);
            } else if (lowerCaseItem.includes(lowerCaseInput)) {
                otherMatches.push(item.name);
            }
        });

        // Sort start matches based on similarity to user input
        startMatches.sort((a, b) => a.toLowerCase().indexOf(userInput.toLowerCase()) - b.toLowerCase().indexOf(userInput.toLowerCase()));

        // Combine start matches and other matches
        const sug = startMatches.concat(otherMatches);

        // Return top 10 suggestions
        return sug.slice(0, 10);
    }

    console.log(suggestions);

    const handleInputChange = (e) => {
        setShowSuggestion(true);
        setShowHistory(false);
        const input = e.target.value;
        setSearchInput(input);
        setSuggestions(suggestItems(items, input));
        
    };

    const handleKeyDown = ( event ) => {
        if(event.key === 'Enter'){
            addToSearchHistory(searchInput);
            navigate('/search-results/' + searchInput);
        }
    }

    return(
        <div className="main-search-page">
            <div className='bar'>
                <FaAngleLeft size={22} color={'grey'} onClick={() => navigate(-1)}/>
                <input type="search" placeholder="Search..." onKeyDown={handleKeyDown} className='input-bar' color='black' autoFocus={true} onChange={handleInputChange}/>
                <FaSearch  size={22} color={'grey'} onClick={() => navigate('/search-results/' + searchInput)}/>
            </div>

            {showHistory && <div style={{color: 'black', fontWeight: '500', fontSize: 12, paddingInline: 10}}>Discover more</div>}

            {showHistory && <div className='history'>
                {searchHistory.length > 0 ? searchHistory?.map((item, index) => (
                    <div className='history-item' onClick={() => navigate('/search-results/' + item)}>
                        {item}
                    </div>
                )): <div>No search history yet</div>}
            </div>}

            {showSuggestion && 
            <div className='suggestion'>
                {suggestions.map((item, index) => (
                    <div className='suggestion-item' onClick={() => navigate('/search-results/' + item)}>
                        <span style={{marginRight: 5}}><FaSearch color={'grey'} size={12}/></span>{item}</div>
                ))}
            </div>}
        </div>
    )
}

export default SearchPage;