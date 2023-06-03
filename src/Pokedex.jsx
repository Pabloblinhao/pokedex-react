import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './Pokedex.css';

function Pokedex() {
    const [pokemon, setPokemon] = useState([]);
    const [visiblePokemonCount, setVisiblePokemonCount] = useState(18);
    const [showLoadMore, setShowLoadMore] = useState(true);

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
                });
            });
    }, []);

    const loadMorePokemon = () => {
        setVisiblePokemonCount(pokemon.length);
        setShowLoadMore(false);
    };

    return (
        <div className="pokedex-grid">
            {pokemon.slice(0, visiblePokemonCount).map((p, index) => (
                <PokemonCard key={index} pokemon={p} pokemonNumber={index + 1} />
            ))}
            {showLoadMore && (
                <div className="load-more-container">
                    <button className="load-more-button" onClick={loadMorePokemon}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pokedex;