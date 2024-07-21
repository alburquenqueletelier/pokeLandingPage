import React from "react";
import { Link } from "react-router-dom";

const CardGrid = ({name, image, getPokeInfo}) => {

    return(
        <Link to={`/pokedex/${name}`} onClick={() => getPokeInfo(name)}>
            <div className="card" style={{width: "18rem"}}>
                <h5 className="card-header">{name}</h5>
                <img src={image} className="card-img-top" alt={name}/>
                <div className="card-body">
                </div>
            </div>
        </Link>
    )
};

export default CardGrid