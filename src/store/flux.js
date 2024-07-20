const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pokeNames: [],
			pokeInfo: [],
			page: 1,
			favs:{
				pokeNames:[],
			},
			search: "",
		},
		actions: {
            getPokeNames: () => {
                fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000")
                .then(response => response.json())
                .then(data=>{
                    setStore({pokeNames: data.results})
                    localStorage.setItem('pokeNames', JSON.stringify(data.results));
                })
				.catch(error => console.log(error))
            },
			getPokeList: (start=0, end=30) => {
				fetch(`https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${end}`)
				.then(response => response.json())
                .then(data=>{
                    setStore({pokeNames: data})
                    localStorage.setItem('pokeNames', JSON.stringify(data));
                })
				.catch(error => console.log(error))
			},
			getPokeInfo: (poke) =>{
				const {pokeInfo} = getStore();
				if (pokeInfo.filter(data => data.id === poke || data.name === poke)){
					console.log("Poke already in system");
				} else {

					fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
					.then(response => response.json())
					.then(pokeInfo=>{
						fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeInfo.id}`)
						.then(response => response.json())
						.then(speciesInfo => {
							let info = {
								id: pokeInfo.id,
								name: pokeInfo.name,
								height: pokeInfo.height,
								weight: pokeInfo.weight,
								types: pokeInfo.types.map(data => data.type.name),
								description: speciesInfo.flavor_text_entries.filter(text => text.language.name === "en")[0],
								image: pokeInfo.sprites.other["official-artwork"].front_shiny
										? pokeInfo.sprites.other["official-artwork"].front_shiny
										: pokeInfo.sprites.front_shiny
							};
							pokeInfo.push(info);
							setStore({pokeInfo: pokeInfo});
						})
						.catch(error => console.log(error))
					})
				}
			},			
			loadInfo: (type)=>{
				const data = JSON.parse(localStorage.getItem(type));
				if (type === 'pokeNames') setStore({pokeNames: data});
				if (type === 'pokeInfo') setStore({pokeInfo: data})
				if (type === 'favs') setStore({favs: data});
			},
			addOrRemove: (poke)=>{
				const {favs} = getStore();
				if (favs.includes(poke)){
					favs = favs.filter(pokemon => pokemon !== poke);
				} else {
					favs.push(poke);
				};
				setStore({favs: favs});
				localStorage.setItem('favs', JSON.stringify(favs));
			},
			setPage: (value) => {
				setStore({page: value});
			},
			setSearch: (value) =>{
				setStore({search: value});
			},
		}
	};
};

export default getState;