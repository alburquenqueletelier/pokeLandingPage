import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const SearchForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const text = event.target.search.value;
        store.pokeNames.forEach(poke => {
            if (poke.name.toLowerCase() === text.toLowerCase()) {
                actions.getPokeInfo(text);
                navigate(`/pokedex/${text}`);
            }
        })
        return 0;
    };

    return (
        <form className="pt-2 " onSubmit={handleSubmit}>
            <div className="d-flex">
                <label htmlFor="search" className="form-label">Search by Name</label>
                <input name="search" list="pokeList" type="text" className="form-control form-control-sm w-50" placeholder="e.g Pikachu"/>
                <datalist id="pokeList">
                    {
                        store?.pokeNames 
                        ? store.pokeNames.map((poke, index)=>{
                            return <option key={index} value={poke.name}  />
                        })
                        : <p>Cargando ...</p>
                    }
                </datalist>
            </div>
        </form>
    );
};

export default SearchForm;