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
        if (text === null || text === undefined || text.trim() === '') return alert("You must enter a pokemon name");
        const pokeMatch = store.pokeNames.some(poke => {
            if (poke.name.toLowerCase() === text.toLowerCase()) {
                actions.getPokeInfo(text);
                navigate(`/pokedex/${text}`);
                return true;
            }
            return false;
        })
        return !pokeMatch && alert(`There isn't a pokemon with the name: ${text}`);
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
                <button type="submit" className="btn btn-secondary favs">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
                </button>
            </div>
        </form>
    );
};

export default SearchForm;