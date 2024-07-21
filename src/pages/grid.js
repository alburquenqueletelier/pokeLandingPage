import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import getImageByUrl from "../utils/utils";
import PokePagination from "../components/pagination";
import CardGrid from "../components/cardGrid";
import SearchForm from "../components/searchForm";
import FavButton from "../components/favButton";
import Spinner from 'react-bootstrap/Spinner';

const Grid = () => {

    const { store, actions } = useContext(Context);
    const currentPage = store.page;

    const handleClick = (e) => {
        actions.setShowFavs();
        console.log("show Favs: ", store.showFavs);
    };

    return (
        <div className="py-2">
            {
                store
                ? (
                    <div>
                        <div className="d-flex justify-content-center">
                            <PokePagination />
                        </div>
                        <div className="d-flex justify-content-center pb-1">
                            <SearchForm />
                            <button onClick={handleClick}>Filter by Favorites</button>
                        </div>
                        <div className="row justify-content-center">
                            {
                                !store.showFavs && store?.pokeNames
                                    ? store.pokeNames.slice((currentPage - 1) * 30, currentPage * 30).map((poke, index) => {
                                        return (
                                            <div className="col-4 col-md-auto" key={index}>
                                                <CardGrid
                                                    name={poke.name}
                                                    image={getImageByUrl(poke.url)}
                                                    getPokeInfo={actions.getPokeInfo}
                                                />
                                                <FavButton key={index} poke={poke} />
                                            </div>
                                        )
                                    })
                                    : store?.showFavs
                                        ?
                                        store.favs.length > 0 ? store.favs.map((poke, index) => {
                                            return (
                                                <div className="col-4 col-md-auto" key={index}>
                                                    <CardGrid
                                                        name={poke.name}
                                                        image={getImageByUrl(poke.url)}
                                                        getPokeInfo={actions.getPokeInfo}
                                                    />
                                                    <FavButton key={index} poke={poke} />
                                                </div>
                                            )
                                        }) : <div className="text-center"> <h3>You don't have favorites pokemon. </h3><h3>Add Someones with "Add" Button</h3> </div>
                                        : <Spinner animation="border" role="status"><span>Loading...</span></Spinner>

                            }

                        </div>
                        <div className="d-flex justify-content-center py-2">
                            <PokePagination />
                        </div>
                    </div>
                )
                : <Spinner animation="border" role="status"><span>Loading</span></Spinner>
            }
        </div>

    )
};

export default Grid;