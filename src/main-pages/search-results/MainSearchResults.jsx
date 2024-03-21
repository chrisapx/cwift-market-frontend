import React from "react";
import './MainSearchResults.css'
import SearchResults from "./SearchResults";
import DSearchResults from "./DSearchResults";

export default function MainSearchResults () {
    return(
        <div className="main-home-area">
            <div className="mobile">
                <SearchResults/>
            </div>
            <div className="desktop">
                <DSearchResults/>
            </div>
        </div>
    )
}
