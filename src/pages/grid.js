import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import getImageByUrl from "../utils/utils";
import PokePagination from "../components/pagination";
import CardGrid from "../components/cardGrid";

const Grid = () => {

    const { store, actions } = useContext(Context);
    const currentPage = store.page;

    return (
        <div>
            {/* <form className="pt-2 ">
                <div className="d-flex">
                    <label htmlFor="search" className="form-label">Search by Name</label>
                    <input type="text" name="search" className="form-control w-50" placeholder="e.g Pikachu" onChange={handleSearch}/>
                </div>
            </form> */}
            <div className="d-flex justify-content-center">
                <PokePagination />
            </div>
                <div className="row justify-content-center">
                    {store?.pokeNames && store.page
                    ? store.pokeNames.slice((currentPage-1)*30, currentPage*30).map((poke, index)=>{
                        return(
                            <div className="col-4 col-md-auto" key={index}>
                                <CardGrid 
                                    name={poke.name}
                                    image={getImageByUrl(poke.url)}
                                    getPokeInfo={actions.getPokeInfo}
                                />
                            </div>
                        )
                    })
                    :<p>Cargando...</p>
                    }
                    
                </div>
            <div className="d-flex justify-content-center">
                <PokePagination />
            </div>
        </div>

    )
};

export default Grid;