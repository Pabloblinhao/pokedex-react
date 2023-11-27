import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css"; // Importando o arquivo CSS

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [activeSection, setActiveSection] = useState("description");
  const [pokemonDescription, setPokemonDescription] = useState("");

  const getEvolutionChain = (chain) => {
    const evolutionChain = [];
    while (chain) {
      const speciesName = chain.species.name;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdFromUrl(
        chain.species.url
      )}.png`;
      evolutionChain.push({ name: speciesName, imageUrl });
      chain = chain.evolves_to[0];
    }
    return evolutionChain;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);

        const speciesUrl = response.data.species.url;
        console.log(response);
        const speciesResponse = await axios.get(speciesUrl);

        const speciesData = speciesResponse.data;
        const descriptionUrl = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        ).flavor_text;
        setPokemonDescription(descriptionUrl);

        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);

        const evolutionChain = getEvolutionChain(
          evolutionResponse.data.chain
        );
        setEvolutions(evolutionChain);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }
  const { name, stats, moves, types, id: pokemonId } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
console.log(pokemon)
  const movesColumns = [[], [], [], [], [], [],[]];
  moves.forEach((move, index) => {
    movesColumns[index % 7].push(move.move.name);
  });

  const primaryType = types[0] ? types[0].type.name.toLowerCase() : '';
  const isDualType = types.length > 1;


  return (
    <div className="pokemonDetails-container">
    <div className={`pokemon-detailsDetails ${primaryType} ${isDualType ? 'dual-type' : ''}`}>
      <div className="pokemon-headerDetails">
        <h1 className="pokemon-nameDetails">{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</h1>
        <h2 className="pokemon-numberDetails">
          N°{pokemonId.toString().padStart(4, "0")}
        </h2>
      </div>
      <div >
  <img src={imageUrl} alt={name} className="pokemon-imageDetails" />
</div>
      <div className="types-Details">
  
  
    {types.map((type, index) => (
      <span key={index} className={`pokemonDetails-types ${type.type.name.toLowerCase().replace(/\s+/g, '')} ${isDualType ? 'single-type' :''}`}
      >
        {type.type.name}
      </span>
    ))}
  
</div>
      <div className="section-buttonsDetails">
        <button
          className={activeSection === "description" ? "active" : ""}
          onClick={() => handleSectionClick("description")}
        >
          Description
        </button>
        <button
          className={activeSection === "stats" ? "active" : ""}
          onClick={() => handleSectionClick("stats")}
        >
          Stats
        </button>
        <button
          className={activeSection === "evolutions" ? "active" : ""}
          onClick={() => handleSectionClick("evolutions")}
        >
          Evolutions
        </button>
        <button
          className={activeSection === "moves" ? "active" : ""}
          onClick={() => handleSectionClick("moves")}
        >
          Moves
        </button>
      </div>
      {activeSection === "description" && (
        <div className="pokemon-description">
          <h3>Description</h3>
          <p>{pokemonDescription}</p>
        </div>
      )}
{activeSection === "stats" && (
  <div className="pokemon-stats">
    <h3>Stats</h3>
    <ul>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="stat-bar">
          <p className="stat-name">{stat.stat.name}</p>
          <div className="bar-container">
            <div
              className="stat-bar-fill"
              style={{ width: `${((stat.base_stat / 255) * 100).toFixed(2)}%` }}
            >
              {((stat.base_stat / 255) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </ul>
  </div>
)}
{activeSection === "evolutions" && (
  <div className="pokemon-evolutions">
    <h3>Evolutions</h3>
    {evolutions.length > 1 ? (
      evolutions.map((evolution, index) => (
        <ul key={index}>
          {evolution.imageUrl && evolution.name !== pokemon.name && (
            <>
              <img
                src={evolution.imageUrl}
                alt={evolution.name}
                className="evolution-image"
              />
              <span className="evolution-name">{evolution.name}</span>
            </>
          )}
        </ul>
      ))
    ) : (
      <p className="no-evolution-message">This Pokémon does not have any evolutions.</p>
    )}
  </div>
)}
      {activeSection === "moves" && (
        
        <div className="Moves-container">
                <h3 className="moves-title">Moves</h3>

          <div className="moves-columns">
            {movesColumns.map((column, columnIndex) => (
              <ul key={columnIndex}>
                {column.map((move, moveIndex) => (
                  <ul key={moveIndex}>{move}</ul>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
      
    </div>
    </div>
  );
}
export default PokemonDetails;
