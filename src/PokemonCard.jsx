import React from 'react';
import './PokemonCard.css';

function PokemonCard({ pokemon, pokemonNumber, onClick }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const fallbackUrl = pokemon.sprites.front_default;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formattedPokemonNumber = String(pokemonNumber).padStart(4, '0'); // Adiciona zeros à esquerda

  return (
    <div className={`pokemon-card ${pokemon.types[0].type.name}`} onClick={() => onClick(pokemon)}>
      <img
        src={imageUrl}
        alt={pokemon.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackUrl;
        }}
      />
      <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
      <span className="pokemon-number">#{formattedPokemonNumber}</span> {/* Exibe a numeração formatada */}
      <p className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span key={index} className="type-pill">
            {type.type.name}
          </span>
        ))}
      </p>
    </div>
  );
}

export default PokemonCard;