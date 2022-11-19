import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDog(name));
  }

  return (
    <div>
      <input
        className="searchbar"
        type="search"
        placeholder="Buscar.."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="buttonSearch"
      >
        {" "}
        Buscar{" "}
      </button>
    </div>
  );
}
