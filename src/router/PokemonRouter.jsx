import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokedex from "../Pokedex";
import PokemonDetails from "../PokemonDetails";

function PokemonRouter(){

return(
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Pokedex/>}></Route>
    <Route  path="/pokemondetails" element={<PokemonDetails/>}></Route>
    </Routes>
    </BrowserRouter>
    )

}
export default PokemonRouter;