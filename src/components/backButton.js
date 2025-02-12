import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return(
        <button className="mt-1 ms-1 btn btn-secondary favs" onClick={() => navigate(-1)}>
            Return!
        </button>
    )
};

export default BackButton;