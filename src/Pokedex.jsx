import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function Pokedex() {
    const [pokemon, setPokemon] = useState([]); 

    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon?limit=1008')
            .then((response) => {
                const promises = response.data.results.map(pokemon => {
                    return axios.get(pokemon.url);
                });
                Promise.all(promises).then(pokemonResponses => {
                    const pokemonData = pokemonResponses.map(response => response.data);
                    setPokemon(pokemonData);
                    console.log(pokemonData)
                });
            });
    }, []);

    return (
        <div>
            {pokemon.map((p, index) => (  
                <PokemonCard key={index} pokemon={p} pokemonNumber={index + 1}/> 
            ))}
        </div>
    );
}

export default Pokedex; 