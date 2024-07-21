const getImageByUrl = (url) => {
    let splitUrl = url.split("/");
    let pokeId = splitUrl[splitUrl.length -2]
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeId}.png`
};

export default getImageByUrl;