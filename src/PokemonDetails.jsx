import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [activeSection, setActiveSection] = useState('stats');

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        const speciesUrl = response.data.species.url;
        axios.get(speciesUrl).then((speciesResponse) => {
          const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
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

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, types, stats, moves } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} />
      <div className="section-buttons">
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
      {activeSection === 'stats' && (
        <div>
          <h3>Stats</h3>
          <ul>
            {stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeSection === 'evolutions' && (
        <div>
          <h3>Evolutions</h3>
          <ul>
            {evolutions.map((evolution) => (
              <li key={evolution.name}>
                <img src={evolution.imageUrl} alt={evolution.name} />
                {evolution.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeSection === 'moves' && (
        <div>
          <h3>Moves</h3>
          <ul>
            {moves.map((move) => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;




