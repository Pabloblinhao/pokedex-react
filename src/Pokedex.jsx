import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './Pokedex.css';

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(18);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1008')
      .then((response) => {
        const promises = response.data.results.map((pokemon) => {
          return axios.get(pokemon.url);
        });
        Promise.all(promises).then((pokemonResponses) => {
          const pokemonData = pokemonResponses.map((response) => response.data);
          setPokemon(pokemonData);
          setFilteredPokemon(pokemonData); // Inicialmente, exibe todos os pokemons
        });
      });
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSearchTerm('');
    setVisiblePokemonCount(18); // Reinicia a contagem de pokemons visíveis
  };

  const handleGenerationChange = (e) => {
    const selectedGeneration = e.target.value;
    setSelectedGeneration(selectedGeneration);
    setSearchTerm('');
    setVisiblePokemonCount(18); // Reinicia a contagem de pokemons visíveis

    if (selectedGeneration === '') {
      setFilteredPokemon(pokemon); // Exibe todos os pokemons novamente
    } else {
      // Define o intervalo de números de Pokémon para cada geração
      const generationRanges = {
        'generation-i': [1, 151],
        'generation-ii': [152, 251],
        'generation-iii': [252, 386],
        'generation-iv': [387, 493],
        'generation-v': [494, 649],
        'generation-vi': [650, 721],
        'generation-vii': [722, 809],
        'generation-viii': [810, 898]
      };

      // Filtra os pokemons com base no intervalo da geração selecionada
      const [minNumber, maxNumber] = generationRanges[selectedGeneration];
      const filteredByGeneration = pokemon.filter((p) => p.id >= minNumber && p.id <= maxNumber);

      setFilteredPokemon(filteredByGeneration);
    }
  };

  const filteredByType = selectedType
    ? filteredPokemon.filter((p) => p.types.some((type) => type.type.name === selectedType))
    : filteredPokemon;

  const filteredPokemonList = filteredByType.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    const scrollContainer = containerRef.current;
    if (scrollContainer.scrollHeight - scrollContainer.scrollTop === scrollContainer.clientHeight) {
      setVisiblePokemonCount((prevCount) => prevCount + 18);
    }
  };

  useEffect(() => {
    const scrollContainer = containerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const loadMorePokemon = () => {
    setVisiblePokemonCount(filteredPokemonList.length);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div>
      <div className="search-filter-container">
        <div className="filter-container">
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">All Types</option>
            <option value="grass">Grass</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="bug">Bug</option>
            <option value="poison">Poison</option>
            <option value="electric">Electric</option>
            <option value="ground">Ground</option>
            <option value="fairy">Fairy</option>
            <option value="flying">Flying</option>
            <option value="fighting">Fighting</option>
            <option value="rock">Rock</option>
            <option value="psychic">Psychic</option>
            <option value="steel">Steel</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="ghost">Ghost</option>
            <option value="normal">Normal</option>
          </select>
          <select value={selectedGeneration} onChange={handleGenerationChange}>
            <option value="">All Generations</option>
            <option value="generation-i">Generation I</option>
            <option value="generation-ii">Generation II</option>
            <option value="generation-iii">Generation III</option>
            <option value="generation-iv">Generation IV</option>
            <option value="generation-v">Generation V</option>
            <option value="generation-vi">Generation VI</option>
            <option value="generation-vii">Generation VII</option>
            <option value="generation-viii">Generation VIII</option>
          </select>
        </div>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokemon..."
          />
        </div>
      </div>
      <div className="pokedex-grid" ref={containerRef}>
        {selectedPokemon ? (
          <PokemonCard
            key={selectedPokemon.id}
            pokemon={selectedPokemon}
            pokemonNumber={selectedPokemon.id}
            onClick={handlePokemonClick}
          />
        ) : (
          filteredPokemonList.slice(0, visiblePokemonCount).map((p, index) => (
            <PokemonCard
              key={index}
              pokemon={p}
              pokemonNumber={index + 1}
              onClick={handlePokemonClick}
            />
          ))
        )}
      </div>
      {filteredPokemonList.length > visiblePokemonCount && !selectedPokemon && (
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