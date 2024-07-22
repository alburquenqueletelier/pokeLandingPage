import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

const CardGrid = ({name, image, getPokeInfo}) => {

    const [loadingImg, setLoadingImg] = useState(true);

    const handleLoad = () => {
        setLoadingImg(false);
    };

    return(
        <div>
            {
                loadingImg && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
            }
            <Link to={`/pokedex/${name}`} onClick={() => getPokeInfo(name)} style={{display: loadingImg ? "none" : "block"}}>
                <div className="card" style={{width: "18rem"}}>
                    <h5 className="card-header">{name}</h5>
                    <img src={image} className="card-img-top" alt={name} onLoad={handleLoad}/>
                    <div className="card-body">
                    </div>
                </div>
            </Link>

        </div>
    )
};

export default CardGrid