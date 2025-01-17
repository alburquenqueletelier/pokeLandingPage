import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

const CardGrid = ({name, image}) => {

    const [loadingImg, setLoadingImg] = useState(true);

    const handleLoad = () => {
        setLoadingImg(false);
    };

    const handleError = (image) => {
        setLoadingImg(false);
        console.log("There is an issue with the image: ", image);
    };

    return(
        <div>
            {
                loadingImg && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
            }
            <Link to={`/pokedex/${name}`} className={loadingImg ? "d-none text-decoration-none" : "d-block text-decoration-none"}>
                <div className="card" style={{width: "18rem"}}>
                    <h5 className="card-header">{name}</h5>
                    <div className="card-body">
                    <img src={image} className="card-img-top" alt={name} onLoad={handleLoad} onError={()=>handleError(image)}/>
                    </div>
                </div>
            </Link>

        </div>
    )
};

export default CardGrid