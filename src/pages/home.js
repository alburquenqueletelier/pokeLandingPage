import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="d-flex justify-content-center align-items-center wallpaper" style={{height:"100vh"}}>
            <Link id="startHomeButton" to={"/pokegrid/1"} className="btn btn-primary">START!</Link>
        </div>
    );
};

export default Home;