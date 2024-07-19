import React from "react";

const CardGrid = (props) => {

    return(
        <div className="card" style={{width: "18rem"}}>
            <h5 className="card-header">#{props.id} {props.name}</h5>
            <img src={props.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    )
};

export default CardGrid