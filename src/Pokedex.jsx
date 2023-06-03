import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './Pokedex.css';

function Pokedex() {
    const [pokemon, setPokemon] = useState([]); 
    const [page, setPage] = useState(0);  // adicionado um estado para rastrear a página atual

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

    const pokemonPerPage = 18;
    const maxPage = Math.ceil(pokemon.length / pokemonPerPage);

    const handleNext = () => {
        setPage(prevPage => Math.min(prevPage + 1, maxPage - 1)); // Não vai além da última página
    };

    const handlePrev = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0)); // Não vai antes da primeira página
    };

    // Seleciona somente os Pokémon para a página atual
    const currentPokemon = pokemon.slice(page * pokemonPerPage, (page + 1) * pokemonPerPage);

    return (
        <div className="pokedex-grid">
            {currentPokemon.map((p, index) => (  
                <PokemonCard key={index} pokemon={p} pokemonNumber={index + 1}/> 
            ))}
            <button onClick={handlePrev} disabled={page === 0}>Previous</button>
            <button onClick={handleNext} disabled={page === maxPage - 1}>Next</button>
        </div>
    );
}

export default Pokedex;