import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function LandingPage() {
  return (
    <div className="divLanding">
      <div className="subdiv">
        <div className="subdiv-cont">
          <div className="divPIdogs">
            <h1> PI DOGS</h1>
          </div>
          <div className="divH3">
            <h3 className="h3">By Lucas Rodriguez</h3>
          </div>
          <div>
            <Link to="/home">
              <button className="buttonIngresar"> Ingresar </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
