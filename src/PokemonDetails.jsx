import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function PokemonDetails() {
  const { id } = useParams();
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, setPokemon] = useState(null);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log('Error fetching Pokemon details:', error);
      });
  }, [url]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, height, weight, types } = pokemon;

  return (
    <div>
      <h1>{name}</h1>
      <p>Types: {types.map((type) => type.type.name).join(', ')}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      {/* Renderize outros atributos do Pokémon aqui */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={name} />
         
          {/* Renderize outros atributos do Pokémon aqui */}
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PokemonDetails;