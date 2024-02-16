import { FaBars, FaRegUser, FaSearch } from 'react-icons/fa';
import { FaAngleLeft } from "react-icons/fa6";
import './SearchPage.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

    const navigate = useNavigate();

    const [showHistory, setShowHistory] = useState(true);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch('https://inventory.nalmart.com/items')
        // fetch('http://127.0.0.1:8080/items')
            .then(res => res.json())
            .then(result => {
                setItems(result); 
                // console.log(result);
            })
            .catch(error => console.log(error));
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

    // Example usage:
    // const userInput = "app";
    // const sugs = suggestItems(items, userInput);
    // setSuggestions(sugs);
    console.log(suggestions);


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
    ];

    const handleFocus = () => {
        setShowHistory(true);
        setShowSuggestion(false);
    };

    const handleInputChange = (e) => {
        setShowSuggestion(true);
        setShowHistory(false);
        const input = e.target.value;
        setSuggestions(suggestItems(items, input));

        // const encodedNames = suggestions.map(name => encodeURIComponent(name));
        //     fetch('http://127.0.0.1:8080/items/names?names=' + encodedNames.join('&names='))
        //     .then(res => res.json())
        //     .then(results => {
        //         results.forEach(item => {
        //             console.log('SearchResult:' + item);
        //             // setCategories(prevCategories => [...prevCategories, category]);
        //         });
        //     })
        //     .catch(error => console.log(error));
    };
    

        

    return(
        <div className="main-search-page">
            <div className='bar'>
                <FaAngleLeft size={22} color={'grey'} onClick={() => navigate(-1)}/>
                <input type="search" placeholder="Search..." className='input-bar' color='black' onFocus={handleFocus} onChange={handleInputChange}/>
                <FaSearch size={22} color={'grey'} onClick={() => navigate('/search-results')}/>
            </div>

            {showHistory && <div style={{color: 'black', fontWeight: '500', fontSize: 12, paddingInline: 10}}>Discover more</div>}

            {showHistory && <div className='history'>
                {history.map((item, index) => (
                    <div className='history-item'>{item.name}</div>
                ))}
            </div>}

            {showSuggestion && 
            <div className='suggestion'>
                {suggestions.map((item, index) => (
                    <div className='suggestion-item' onClick={() => setSearchInput(item)}><span style={{marginRight: 5}}><FaSearch color={'grey'} size={12}/></span>{item}</div>
                ))}
            </div>}
        </div>
    )
}

export default SearchPage;