import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="d-flex justify-content-center align-items-center wallpaper" style={{height:"100vh"}}>
            <Link id="startHomeButton" to={"/pokegrid/1"} className="btn" ><span className="holographic-text">START!</span></Link>
        </div>
    );
};

export default Home;