import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'; // Importando o arquivo CSS

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [activeSection, setActiveSection] = useState('description');
  const [pokemonDescription, setPokemonDescription] = useState('');

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        const speciesUrl = response.data.species.url;
        axios.get(speciesUrl).then((speciesResponse) => {
          const speciesData = speciesResponse.data;
          const descriptionUrl = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === 'en'
          ).flavor_text;
          setPokemonDescription(descriptionUrl);
          const evolutionChainUrl = speciesData.evolution_chain.url;
          axios.get(evolutionChainUrl).then((evolutionResponse) => {
            const evolutionChain = getEvolutionChain(evolutionResponse.data.chain);
            setEvolutions(evolutionChain);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const getEvolutionChain = (chain) => {
    const evolutionChain = [];
    while (chain) {
      const speciesName = chain.species.name;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdFromUrl(chain.species.url)}.png`;
      evolutionChain.push({ name: speciesName, imageUrl });
      chain = chain.evolves_to[0];
    }
    return evolutionChain;
  };

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, types, stats, moves, id: pokemonId } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-detailsDetails">
      <div className="pokemon-headerDetails">
        <h2 className="pokemon-numberDetails">#{pokemonId.toString().padStart(4, '0')}</h2>
        <h1 className="pokemon-nameDetails">{name}</h1>
      </div>
      <img src={imageUrl} alt={name} className="pokemon-imageDetails" />
      <div className="section-buttonsDetails">
        <button
          className={activeSection === 'description' ? 'active' : ''}
          onClick={() => handleSectionClick('description')}
        >
          Description
        </button>
        <button
          className={activeSection === 'stats' ? 'active' : ''}
          onClick={() => handleSectionClick('stats')}
        >
          Stats
        </button>
        <button
          className={activeSection === 'evolutions' ? 'active' : ''}
          onClick={() => handleSectionClick('evolutions')}
        >
          Evolutions
        </button>
        <button
          className={activeSection === 'moves' ? 'active' : ''}
          onClick={() => handleSectionClick('moves')}
        >
          Moves
        </button>
      </div>
      {activeSection === 'description' && (
        <div className='pokemon-description'>
          <h3>Description</h3>
          <p>{pokemonDescription}</p>
        </div>
      )}
      {activeSection === 'stats' && (
        <div className="pokemon-stats">
          <h3>Stats</h3>
          <ul>
            {stats.map((stat) => (
              <p key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
          </ul>
        </div>
      )}
      {activeSection === 'evolutions' && (
        <div className="pokemon-evolutions">
          <h3>Evolutions</h3>
          
          {evolutions.map((evolution) => (
  <li key={evolution.name}>
    <img src={evolution.imageUrl} alt={evolution.name} className="evolution-image" />
    {evolution.name}
  </li>
))}
          
        </div>
      )}
      {activeSection === 'moves' && (
        <div className="pokemon-moves">
          <h3>Moves</h3>
          <ul>
            {moves.map((move) => (
              <p key={move.move.name}>{move.move.name}</p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;