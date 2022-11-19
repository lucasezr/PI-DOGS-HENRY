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
        <div className="name-Conteiner">
          <h3 className="h3Name"> {name}</h3>
        </div>
        <div className="temperaments">
          {" "}
          <p>Temperaments:</p>
          {temperaments?.map((e) => {
            return <p key={e}> {e} </p>;
          })}{" "}
        </div>
        <h5 className="min-weight"> Minimum weight: {min_weight} </h5>
        {/* <h5> {max_weight} </h5> */}
        <img className="image" src={image} alt="img not found" />
      </Link>
    </div>
  );
}

//{`${temperaments} ` + ' '}
