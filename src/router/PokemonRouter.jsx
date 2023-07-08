import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokedex from "../Pokedex";
import PokemonDetails from "../PokemonDetails";
import Navbar from "../Navbar";

function PokemonRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PokemonRouter;