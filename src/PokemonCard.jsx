import React from "react";
import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function PokemonCard({ pokemon, pokemonNumber  }) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    const [show, setShow] = useState(false);
    const [imgSrc, setImgSrc] = useState(imageUrl);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleImgError = () => {
        setImgSrc(pokemon.sprites.front_default);
      };

      function formatPokemonType(types) {
        return types.map((type) => type.type.name).join(", ");
      }
      const pokemonTypes = formatPokemonType(pokemon.types);
    //   const pokemonTypes = pokemon.types.map(type => type.type.name).join(', ');
      const pokemonNumberString = String(pokemonNumber).padStart(4, '0');
    return (
        <div>
            <img 
               src={imgSrc} 
               alt={pokemon.name} 
               onClick={handleShow} 
               onError={handleImgError}
            />
            <h3>{pokemon.name}</h3>
            <h3>{pokemonNumberString} - {pokemon.name}</h3>
            <p>Types: {pokemonTypes}</p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={imageUrl} alt={pokemon.name} />
                    <p>Types: {pokemonTypes}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>HP: {pokemon.stats.find(stat => stat.stat.name === "hp").base_stat}</p>
                    <p>Attack: {pokemon.stats.find(stat => stat.stat.name === "attack").base_stat}</p>
                    <p>Defense: {pokemon.stats.find(stat => stat.stat.name === "defense").base_stat}</p>
                    <p>Speed: {pokemon.stats.find(stat => stat.stat.name === "speed").base_stat}</p>
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