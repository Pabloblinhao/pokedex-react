import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ name, type, image, id }) {
  const formattedPokemonNumber = String(id).padStart(4, '0');

  const primaryType = type[0].toLowerCase();

  return (
    <div className={`pokemon-card ${primaryType}`}>
      <Link to={`/pokemon/${id}`}>
        <img
          className="pokemon-image"
          src={image}
          alt={`${name} sprite`}
        />
      </Link>
      <h3 className="pokemon-name">{name}</h3>
      <div className="pokemon-types">
        {type.map((typeName, index) => (
          <span
            key={index}
            className={`type-pill ${typeName.toLowerCase().replace(/\s+/g, '')}`}
          >
            {typeName}
          </span>
        ))}
      </div>
      <span className="pokemon-number">#{formattedPokemonNumber}</span>
    </div>
  );
}

export default PokemonCard;
