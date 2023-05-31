import React from "react";
import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function PokemonCard({ pokemon }) {
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
    const [show, setShow] = useState(false);
    const [imgSrc, setImgSrc] = useState(imageUrl);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleImgError = () => {
        setImgSrc(pokemon.sprites.front_default);
      };

    return (
        <div>
            <img 
               src={imgSrc} 
               alt={pokemon.name} 
               onClick={handleShow} 
               onError={handleImgError}
            />
            <h3>{pokemon.name}</h3>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={imageUrl} alt={pokemon.name} />
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    {/* Adicione mais informações sobre o Pokémon aqui. */}
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