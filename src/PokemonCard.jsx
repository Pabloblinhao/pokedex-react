import React from "react";
import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import './PokemonCard.css';

function PokemonCard({ pokemon, pokemonNumber }) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    const fallbackUrl = pokemon.sprites.front_default;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formatPokemonType = (types) => {
        return types.map((type) => type.type.name).join(", ");
    };
  
    const formatPokemonStats = (stats) => {
        return stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ");
    };
  
    const pokemonTypes = formatPokemonType(pokemon.types);
    const pokemonStats = formatPokemonStats(pokemon.stats);
    const pokemonNumberString = String(pokemonNumber).padStart(4, '0');

    return (
        <div className={`pokemon-card ${pokemon.types[0].type.name}`}>
            <img 
                src={imageUrl} 
                alt={pokemon.name} 
                onClick={handleShow} 
                onError={(e) => {e.target.onerror = null; e.target.src = fallbackUrl}}
            />
            <h3>{pokemonNumberString} - {pokemon.name}</h3>
            <p>Types: {pokemonTypes}</p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={imageUrl} alt={pokemon.name} onError={(e) => {e.target.onerror = null; e.target.src = fallbackUrl}} />
                    <p>Types: {pokemonTypes}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Stats: {pokemonStats}</p>
                    <p>Base Experience: {pokemon.base_experience}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PokemonCard;