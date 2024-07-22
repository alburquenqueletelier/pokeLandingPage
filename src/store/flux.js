
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pokeNames: [],
			pokeInfo: [],
			page: 1,
			favs:[],
			showFavs: false,
			search: "",
		},
		actions: {
            getPokeNames: () => {
				console.log("getPokeNames start");
                fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000")
                .then(response => response.json())
                .then(data=>{
                    setStore({pokeNames: data.results})
                    localStorage.setItem('pokeNames', JSON.stringify(data.results));
					console.log("getPokeNames success")
                })
				.catch(error => console.log(error))
            },
			getPokeInfo: (poke) =>{
				const {pokeInfo} = getStore();
				if (pokeInfo.filter(data => data.id === poke || data.name === poke).length > 0){
					console.log("Poke already in system");
				} else {
					console.log("getPokeInfo start");
					fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
					.then(response => response.json())
					.then(pokeFetched=>{
						let splitUrl = pokeFetched.species.url.split("/");
    					let speciesId = splitUrl[splitUrl.length -2]
						fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesId}`)
						.then(response => response.json())
						.then(speciesInfo => {
							let info = {
								id: pokeFetched.id,
								name: pokeFetched.name,
								height: pokeFetched.height,
								weight: pokeFetched.weight,
								types: pokeFetched.types.map(data => data.type.name),
								description: speciesInfo.flavor_text_entries.filter(text => text.language.name === "en")[0].flavor_text,
								image: pokeFetched.sprites.other["official-artwork"].front_shiny
										? pokeFetched.sprites.other["official-artwork"].front_shiny
										: pokeFetched.sprites.front_shiny
							};
							pokeInfo.push(info);
							setStore({pokeInfo: pokeInfo});
							console.log("getPokeInfo success");
						})
						.catch(error => console.log(error))
					})
					.catch(error => console.log(error))
				}
			},			
			loadInfo: (type)=>{
				const data = JSON.parse(localStorage.getItem(type));
				if (type === 'pokeNames') setStore({pokeNames: data});
				if (type === 'pokeInfo') setStore({pokeInfo: data});
				if (type === 'favs') setStore({favs: data});
			},
			addOrRemove: (poke)=>{
				let {favs} = getStore();
				if (favs.filter(data => data.name === poke.name).length > 0){
					favs = favs.filter(data => data.name !== poke.name);
				} else {
					favs.push(poke);
				};
				localStorage.setItem('favs', JSON.stringify(favs));
				setStore({favs: favs});
			},
			setPage: (value) => {
				setStore({page: value});
				localStorage.getItem("pokenames")
				? getActions().loadInfo("pokeNames")
				: getActions().getPokeNames();
			},
			setSearch: (value) =>{
				setStore({search: value});
			},
			setShowFavs: () => {
				setStore({showFavs: !getStore().showFavs});
			}
		}
	};
};

export default getState;