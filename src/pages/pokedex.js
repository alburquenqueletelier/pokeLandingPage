import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import BackButton from "../components/backButton";
import Spinner from "react-bootstrap/esm/Spinner";

const Pokedex = () => {

    const {store} = useContext(Context);
    const {poke} = useParams();
    const [pokeToRender, setPokeToRender] = useState();
    const [loadingImg, setLoadingImg] = useState(true);

    const handleLoad = () => {
        setLoadingImg(false);
    };

    useEffect(()=>{
        setPokeToRender(store.pokeInfo.filter(dataPoke => dataPoke.name === poke)[0]);
        return () => {
            console.log('Cleanup ran');
        };
    },)

    return(
        
        <div className="container border rounded border-secondary border-2 mt-1 px-1" >
            
            <div className="d-flex">
            <BackButton/>
            <h1 className="m-auto text-decoration-underline">Pokédex Information</h1>

            </div>
                {
                    pokeToRender 
                    ?
                    <div className="row">
                        <div className="col-7 col-sm-3">
                            <h5 className="text-center border border-1 mt-1">#{pokeToRender.id} {pokeToRender.name}</h5>
                            <img className="card-img-top bg-light bg-opacity-75 rounded mb-1" src={pokeToRender.image} alt={pokeToRender.name} />

                        </div>
                        <div className="col-12 col-sm-9">
                            <div className="d-flex mt-1">
                                {
                                    pokeToRender.types.map((type, index) => {
                                        return (
                                            <p key={index} className="border border-2 px-1 me-2 text-capitalize">{type}</p>
                                        )
                                    })
                                }
                            </div>
                            <p>HT: {pokeToRender.height}</p>
                            <p>WT: {pokeToRender.weight}</p>
                            <p className="border border-1 d-block ps-1 py-1 rounded">{pokeToRender.description}</p>
                        </div>
                    </div>
                    : <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                        <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
                    </div>

                }        
        </div>
        
    )
};

export default Pokedex;