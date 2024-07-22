import React from "react";
import BackButton from "../components/backButton";

const NoMatch = () => {
    return (
        <div className="row">
            <div className="col-4">
                <h3>We don't have that Route. Please come back</h3>
                <BackButton />
            </div>
        </div>
    )
};

export default NoMatch;