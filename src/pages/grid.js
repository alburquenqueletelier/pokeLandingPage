import React from "react";
import { useState, useEffect } from "react";
import CardGrid from "../components/cardGrid";
import { Link } from "react-router-dom";

const Grid = () => {

    const [pokeList, setPokeList] = useState({});
    const [pokeInfo, setPokeInfo] = useState([]);

    const fechData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data
    };

    const next = () => {
        fetch(pokeList.next)
        .then(response => response.json())
        .then(data => setPokeList(data))
    };

    const previous = () => {
        fetch(pokeList.previous)
        .then(response => response.json())
        .then(data => setPokeList(data))
    };

    useEffect(()=>{
        
        const loadList = async (url) => {
            const data = await fechData(url)
            setPokeList(data);
            console.log(pokeList);
        };

        const loadPokeInfo = async (url) => {
            const data = await fechData(url)
            return data
        }
        
        if (sessionStorage.getItem("data")){
            setPokeList(JSON.parse(sessionStorage.getItem("data")));
        } else {
            loadList("https://pokeapi.co/api/v2/pokemon?limit=6&offset=6");
            sessionStorage.setItem("data", JSON.stringify(pokeList));
        };

        if (sessionStorage.getItem("dataPoke")){
            setPokeInfo(JSON.parse(sessionStorage.getItem("dataPoke")));
        } else {
            pokeList?.results.forEach(async poke => {
                const data = await loadPokeInfo(poke.url);
                const description = await loadPokeInfo(data.species.url)
                const info = {
                    id: data.id,
                    name: data.name,
                    description: description.flavor_text_entries?.filter(text => text.language === "en")[0]?.flavor_text,
                    height: data.height,
                    weight: data.weight,
                    types: data.types.map(element => {
                        return element.type.name
                    }),
                    image: data.sprites.other["official-artwork"]
                            ? data.sprites.other["official-artwork"]["front_default"]
                            : data.sprites.front_default
                };
                console.log(info);
                setPokeInfo((pokeInfo) => [...pokeInfo, info]);
            });
        }
    }, []);


    return(
        <div className="row">
            {pokeInfo? pokeInfo.map((poke, index) => {
                return(
                    <div className="col-auto" key={index}>
                        <Link to={`/pokedex/${poke.name}`} state={{poke}}>
                            <CardGrid 
                                id={poke.id}
                                name={poke.name}
                                description={poke.description}
                                image={poke.image}
                            />
                        </Link>
                    </div>
                );
            })
            :
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            }
            <button onClick={next}>prueba</button>
        </div>
        
    )
};

export default Grid;