import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import BackButton from "../components/backButton";

const Pokedex = () => {

    const {store} = useContext(Context);
    const {poke} = useParams();
    const [pokeToRender, setPokeToRender] = useState();

    useEffect(()=>{
        setPokeToRender(store.pokeInfo.filter(dataPoke => dataPoke.name === poke)[0]);
        return () => {
            console.log('Cleanup ran');
        };
    },)

    return(
        
        <div className="container border rounded border-secondary border-2 mt-1 px-1">
            
            <div className="d-flex">
            <BackButton/>
            <h1 className="m-auto">Pokédex Information</h1>

            </div>
                {
                    pokeToRender 
                    ?
                    <div className="row">
                        <div className="col-7 col-sm-3">
                            <h5 className="text-center">#{pokeToRender.id} {pokeToRender.name}</h5>
                            <img className="card-img-top" src={pokeToRender.image} alt={pokeToRender.name} />
                            {/* <div className="col-9 col-sm-auto">
                                <img className="card-img-top align-self-center" src={pokeToRender.image} alt={pokeToRender.name} />
                            </div> */}
                        </div>
                        <div className="col-12 col-sm-9">
                            <div className="d-flex">
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
                            <p>{pokeToRender.description}</p>
                        </div>
                    </div>
                    : <p>Cargando ...</p>

                }        
        </div>
        
    )
};

export default Pokedex;