import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Pokeball from "../src/assets/Pokeball.png";
import Pokedex from "../src/assets/Pokedex.png";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Pokeball} alt="Home-image" className="logo-image" />
      </Link>

      <img src={Pokedex}className="Pokedex-text"/>
    </nav>
  );
}

export default Navbar;
