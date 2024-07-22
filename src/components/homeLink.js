import React from "react";
import { Link } from "react-router-dom";

const HomeLink = () => {
    return (
        <div className="d-flex justify-content-center">
            <Link to={"/"} style={{textDecoration: "none"}}>
                <h1 className="bg-secondary bg-gradient bg-opacity-75 text-light favs rounded">Home</h1>
            </Link>
        </div>
    )
};

export default HomeLink;