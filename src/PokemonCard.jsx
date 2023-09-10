import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ name,type,image,id }) {
  
  


  const formattedPokemonNumber = String(id).padStart(4, '0');

  return (
    <div className={`pokemon-card ${type}`}>
      <Link to={`/pokemon/${id}`}>
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            
          }}
        />
      </Link>
      
      <span className="pokemon-number">#{formattedPokemonNumber}</span>
      <p className="pokemon-types">
        {type}
          <span className="type-pill">
            
          </span>
        
      </p>
    </div>
  );
}

export default PokemonCard;