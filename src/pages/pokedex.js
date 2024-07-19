import React from "react";
import { useLocation } from 'react-router-dom';

const Pokedex = () => {
    const location = useLocation();
    const data = location.state?.poke;

    if (!data){
        return             (<div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>)
    };

    return(
        <div className="container">
            <h1>Pokédex Information</h1>
            <div className="row">
                <div className="col-auto">
                    <p>#{data.id} {data.name}</p>
                    <img src={data.image} alt={data.name} className="card-img-top"/>
                </div>
                <div className="col-auto">
                    <div className="d-block">
                        <p>Tpyes: {data.type}</p>
                        <p>Height: {data.height}</p>
                        <p>Weight: {data.weight}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <p>{data.description}</p>
            </div>
        </div>
    )
};

export default Pokedex;