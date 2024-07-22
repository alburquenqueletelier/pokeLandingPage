import React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import getImageByUrl from "../utils/utils";
import PokePagination from "../components/pagination";
import CardGrid from "../components/cardGrid";
import SearchForm from "../components/searchForm";
import FavButton from "../components/favButton";
import HomeLink from "../components/homeLink";
import Spinner from 'react-bootstrap/Spinner';

const Grid = () => {

    const { store, actions } = useContext(Context);
    const { page } = useParams();
    
    useEffect(() => {
        if (page) {
            actions.setPage(Number(page));
        } else {
            actions.setPage(1);
        }
    }, [page, store.page]);
    
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
                        <HomeLink />
                        <div className="d-flex justify-content-center">
                            <PokePagination />
                        </div>
                        <div className="d-flex justify-content-center pb-1">
                            <SearchForm />
                            <button onClick={handleClick} className={store.showFavs ? "btn btn-danger" : "btn btn-primary"}>{store.showFavs ? "Remove Filter" : "Filter by Favorites"}</button>
                        </div>
                        <div className="row justify-content-center">
                            {
                                !store.showFavs && store?.pokeNames
                                    ? store.pokeNames.slice((currentPage - 1) * 30, currentPage * 30).map((poke, index) => {
                                        return (
                                            <div className="col-auto col-sm-auto" key={index}>
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
                                                <div className="col-auto col-sm-auto" key={index}>
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