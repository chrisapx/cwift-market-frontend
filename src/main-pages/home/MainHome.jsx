import React from "react";
import DHome from "./DHome";
import Home from "./Home";
import './MainHome.css'

const MainHome = () => {
    return(
        <div className="main-home-area">
            <div className="mobile">
                <Home/>
            </div>
            <div className="dektop">
                <DHome/>
            </div>
        </div>
    )
}

export default MainHome;