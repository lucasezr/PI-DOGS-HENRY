import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clearDetail, getAllDogs, getAllTemperaments } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import { filterCreated } from "../actions";
import { sortWeight } from "../actions";
import { orderByName } from "../actions";
import SearchBar from "./SearchBar";
import { filterByTemperament } from "../actions";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); // me trae del reducer el estado dogs
  const allTemps = useSelector((state) => state.temperaments);
  const errorState = useSelector((state) => state.error);
  // console.log(allTemps)
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //useEff -> escuchar acciones
    if (allDogs.length === 0) {
      dispatch(getAllDogs());
    } // carga todos los dogs una sola vez.
    dispatch(getAllTemperaments());
    dispatch(clearDetail());

    setCurrentPage(1); // me setea la pagina en uno
  }, [dispatch]); //Despacho las acciones

  function handleClick(e) {
    e.preventDefault();
    console.log("se volvieron a cargar");
    dispatch(getAllDogs());
  }

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(sortWeight(e.target.value));
    setCurrentPage(1); //cuando hago el ordenamiento seteame en la primer pagina
    setOrden(`Ordernado ${e.target.value}`); //modifica el estado global(para que se renderice cada vez que ordeno)
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div className="homeDiv">
      <div className="header">
        <div className="button_create_raza">
          <Link to="/dogs"> Crear Raza </Link>
        </div>

        <div className="nameProject">
          <h1> PI DOGS</h1>
        </div>

        <div className="searchbar_box">
          <SearchBar className="prueba" />
        </div>
      </div>
      <button onClick={(e) => handleClick(e)}>
        Volver a cargar todas las razas
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc"> Ascendente </option>
          <option value="desc"> Descendente </option>
        </select>

        <select onChange={(e) => handleFilterByTemperament(e)}>
          <option value="Todos">Todos</option>

          {allTemps?.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {" "}
              {temp.name}{" "}
            </option>
          ))}
          <option value="n/a"> n/a </option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all"> Todas </option>
          <option value="api"> Existentes </option>
          <option value="created"> Creadas </option>
        </select>

        <select onChange={(e) => handleSortWeight(e)}>
          {/* <option value= 'weight'>Peso</option> */}
          <option value="min_weight">Mayor peso</option>
          <option value="max_weight">Menor peso</option>
        </select>
      </div>

      <div className="cartas">
        {!errorState.length ? (
          currentDogs &&
          currentDogs.map((el) => {
            return (
              <Card
                id={el.id}
                name={el.name}
                temperaments={el.temperaments} //el.temperaments.createdInDb ? el.temperaments.map((e) => e.name) : el.temperaments
                min_weight={el.min_weight}
                max_weight={el.max_weight}
                image={el.image}
              />
            );
          })
        ) : (
          <p> No se encontro lo que buscabas </p>
        )}
      </div>

      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
    </div>
  );
}
