import React from "react";
import "../styles/paginado.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button
              className="numberPaginado"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
}
