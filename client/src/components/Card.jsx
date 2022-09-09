import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";
export default function Card({
  id,
  name,
  image,
  temperaments,
  min_weight,
  max_weight,
}) {
  return (
    <div className="Card" key={id}>
      <Link className="linkDetail" to={`/details/${id}`}>
        <h3> {name}</h3>
        <div className="temperaments">
          {" "}
          <p>Temperamentos:</p>
          {temperaments?.map((e) => {
            return <p key={e}> {e} </p>;
          })}{" "}
        </div>
        <h5> Peso minimo: {min_weight} </h5>
        {/* <h5> {max_weight} </h5> */}
        <img className="image" src={image} alt="img not found" />
      </Link>
    </div>
  );
}

//{`${temperaments} ` + ' '}
