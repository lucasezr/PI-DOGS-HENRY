import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function LandingPage() {
  return (
    <div className="divLanding">
      <h1> PI Dogs by Lucas Rodriguez</h1>
      <Link to="/home">
        <button> Ingresar </button>
      </Link>
    </div>
  );
}
