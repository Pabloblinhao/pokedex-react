import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Pokeball from "../src/assets/Pokeball.png";
import Pokedex from "../src/assets/Pokedex.png";

function Navbar() {
  const resetPage = () => {
    window.location.href = "/";
  };
  
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Pokeball} alt="" onClick={resetPage}className="logo-image" />
      </Link>

      <img src={Pokedex}alt=""className="Pokedex-text"/>
    </nav>
  );
}

export default Navbar;
