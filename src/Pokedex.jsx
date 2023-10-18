import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './Pokedex.css';
// import  Search  from './assets/Search.png';
function Pokedex() {
  const [pokeList, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [listInput, setListInput] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredGeneration, setFilteredGeneration] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(18);
  const [selectedInputItemIndex, setSelectedInputItemIndex] = useState(-1);
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(true);
  
console.log()
  
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1008")
      .then((response) => {
        const data = response.data.results;
        const pokemonDetails = data.map((pokemon, index) => ({
          name: pokemon.name,
          id: index + 1,
          info: {},
        }));

        Promise.all(
          pokemonDetails.map((pokemon) => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`))
        ).then((responses) => {
          responses.forEach((response, index) => {
            pokemonDetails[index].info.image = response.data.sprites.other['official-artwork'].front_default;
            pokemonDetails[index].info.types = response.data.types.map((type) => type.type.name);
          });
          setList(pokemonDetails);
          setFilteredGeneration(pokemonDetails); // Inicialmente, exibe todos os pokemons
        });
      });
  }, []);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleInputChange = (event) => {
    const list = event.target.value.toLowerCase();
  
    if (list === '') {
      setListInput([]);
      setSelectedInputItemIndex(-1); // Redefine a seleção
    } else {
      const pokeFilter = pokeList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(list)
      );
      setListInput(pokeFilter.slice(0, 5));
    }
    setIsSuggestionListOpen(true);

  };
  

  const handleSearch = () => {
    const filteredList = pokeList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredGeneration(filteredList);
    setSearchPerformed(true);
    setIsSuggestionListOpen(false); // Fecha a lista de sugestões
  };

  const handlePokemonClick = (pokemonName) => {
    setSearchValue(pokemonName);
    setListInput([]);
    setIsSuggestionListOpen(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    } else if (event.key === "ArrowDown") {
      setSelectedInputItemIndex((prevIndex) =>
        prevIndex < listInput.length - 1 ? prevIndex + 1 : prevIndex
      );
      if (listInput.length > 0) {
        setSearchValue(listInput[selectedInputItemIndex + 1]?.name || searchValue);
      }
    } else if (event.key === "ArrowUp") {
      setSelectedInputItemIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      if (listInput.length > 0) {
        setSearchValue(listInput[selectedInputItemIndex - 1]?.name || searchValue);
      }
    }
  };

  const handleGenerationChange = (e) => {
    const filteredGeneration = e.target.value;
    setSelectedGeneration(filteredGeneration);

    if (filteredGeneration === '') {
      setFilteredGeneration(pokeList);
    } else {
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

      const [minNumber, maxNumber] = generationRanges[filteredGeneration];
      const filteredByGeneration = pokeList.filter((p) => p.id >= minNumber && p.id <= maxNumber);

      setFilteredGeneration(filteredByGeneration);
    }
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedType(selectedType);
    
    if (selectedType === '') {
      setFilteredGeneration(pokeList);
    } else {
      const filteredByType = pokeList.filter((p) =>
        p.info.types.includes(selectedType)
      );
      setFilteredGeneration(filteredByType);
    }
  };
  const filteredByType = selectedType
  ? filteredGeneration.filter((p) => p.info.types.includes(selectedType))
  : filteredGeneration;

const filteredPokemonList = filteredByType.filter((p) =>
  p.name.toLowerCase().includes(searchValue.toLowerCase())
  
);


  const loadMorePokemon = () => {
    setVisiblePokemonCount(filteredPokemonList.length);
  };
  
  
  const handleScroll = () => {
    const scrollContainer = containerRef.current;
    if (scrollContainer.scrollHeight - scrollContainer.scrollTop === scrollContainer.clientHeight) {
      setVisiblePokemonCount((prevCount) => prevCount + 18);
    }
  };



  return (
    <div>
      <input
        type='text'
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleInputChange(e);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Procure por um pokémon..."
        
      />

      <button onClick={handleSearch}>Buscar</button>

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

 
      {isSuggestionListOpen && (
  <div className="suggestions-container">
    {listInput.map((pokemon, index) => (
      <div
        key={pokemon.id}
        onClick={() => handlePokemonClick(pokemon.name)}
        className={`list-item ${index === selectedInputItemIndex ? "selected" : ""}`}
      >
        {pokemon.name}
      </div>
    ))}
  </div>
)}
      <div className="pokedex-grid" ref={containerRef}>
  {searchPerformed
    ? filteredGeneration.slice(0, visiblePokemonCount).map((pokemon) => (
      <div key={pokemon.id}>
        <PokemonCard
          name={pokemon.name}
          type={pokemon.info.types}
          image={pokemon.info.image}
          id={pokemon.id}
        />
      </div>
    ))
    : filteredGeneration.slice(0, visiblePokemonCount).map((pokemon) => (
      <div key={pokemon.id}>
        <PokemonCard
          name={pokemon.name}
          type={pokemon.info.types}
          image={pokemon.info.image}
          id={pokemon.id}
        />
      </div>
    ))}
</div>

      {filteredGeneration.length > visiblePokemonCount && !searchValue &&(
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