import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const FavButton = ({poke}) => {

    const {store, actions} = useContext(Context);

    const isInFav = (poke) => {
        return store.favs.filter(data => data.name === poke.name).length > 0;  
    };

    return(
        <button className={isInFav(poke) ? "btn btn-danger" : "btn btn-primary"} onClick={() => actions.addOrRemove(poke)}>
            {isInFav(poke)
            ? <span>Remove</span>
            : <span>Add</span>
            }
        </button>
    );
};

export default FavButton;