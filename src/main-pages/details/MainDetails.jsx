import React from "react";
import Details from "./Details";
import DDetailsPage from "./DDetails";

export default function MainDetails(){
    return(
        <div className="main-details-area">
            <div className="mobile">
                <Details/>
            </div>
            <div className="desktop">
                <DDetailsPage/>
            </div>
        </div>
    )
}