import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getDogs, getAllTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/form.css";

export default function DogCreate() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span_min: "",
    life_span_max: "",
    image: "",
    temperaments: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: parseInt(e.target.value), // me almacena lo que ya estaba guardado y me va concatenando cada cosa que voy seleccionando
    });
    console.log(input);
  }

  function handleChangeName(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // me almacena lo que ya estaba guardado y me va concatenando cada cosa que voy seleccionando
    });
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
    console.log(input);
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temps) => temps !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (disableDesactivate !== undefined) {
      alert("Necesitas completar todos los campos!");
    } else {
      alert("Personaje creado!");

      dispatch(postDog(input));
      setInput({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span_min: "",
        life_span_max: "",
        image: "",
        temperaments: [],
      });
      history.push("/home");
    }
  }

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);

  //------------------------------------- VALIDACIONES -------------------------------------------------//

  const regexS = {
    espaciosIni: /^\s/, // eslint-disable-line
    caracteresEsp: /[^\s\w]/g, // eslint-disable-line
    numeros: /[^a-z ]\ ([.0-9])\d/g, // eslint-disable-line
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/gi, // eslint-disable-line
  };

  const validacionName = (entrada) => {
    if (regexS.espaciosIni.test(entrada))
      return `No puede iniciar con espacios en blanco`;
    if (entrada.length <= 3) return `Nombre muy corto`;
    if (entrada.length > 30) return `Nombre muy largo`;
    if (regexS.numeros.test(entrada))
      return `No se admite numeros en este campo`;
    if (regexS.caracteresEsp.test(entrada))
      return `No se admite caracteres especiales en este campo`;
  };
  const validacionImg = (entrada) => {
    if (!regexS.url.test(entrada)) return `Debe ser una url valida`;
  };
  const validacionMinHeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada1 < 15) return `El valor minimo no puede ser menor a 15 cm.`;
    if (entrada1 > 70) return `El valor minimo no puede ser mayor a 70 cm.`;
    if (entrada1 > entrada2) {
      return `El valor minimo no puede ser mayor que el valor maximo`;
    }
  };
  const validacionMaxHeigh = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada2 > 100) return `El valor maximo no puede ser mayor a 100 cm.`;
    if (entrada2 < entrada1) {
      return `El valor maximo no puede ser menor que el valor minimo`;
    }
  };
  const validacionMinWeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada1 < 1) return `El valor minimo no puede ser menor a 1 kg.`;
    if (entrada1 > 70) return `El valor minimo no puede ser mayor a 70 Kg.`;
    if (entrada1 > entrada2) {
      return `El valor minimo no puede ser mayor que el valor maximo`;
    }
  };
  const validacionMaxWeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada2 > 100) return `El valor maximo no puede ser mayor a 100 Kg.`;
    if (entrada2 < entrada1) {
      return `El valor maximo no puede ser menor que el valor minimo`;
    }
  };
  const validacionTempers = (entrada) => {
    if (entrada.length < 1) {
      return `Se requiere que al menos tenga un temperamento`;
    }
    if (entrada.length > 15) {
      return `No se pueden seleccionar mas de 15 temperamentos`;
    }
  };
  const validacionMinLifeSpan = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada1 < 6) return `El valor minimo no puede ser menor a 6 años.`;
    if (entrada1 > 10) return `El valor minimo no puede ser mayor a 10 años.`;
    if (entrada1 > entrada2) {
      return `El valor minimo no puede ser mayor que el valor maximo`;
    }
  };
  const validacionMaxLifeSpan = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada2 > 16) return `El valor maximo no puede ser mayor a 16 años.`;
    if (entrada2 < entrada1) {
      return `El valor maximo no puede ser menor que el valor minimo`;
    }
  };

  const errorName = validacionName(input.name);
  const errorImg = validacionImg(input.image);
  const errorMinH = validacionMinHeight(input.min_height, input.max_height);
  const errorMaxH = validacionMaxHeigh(input.min_height, input.max_height);
  const errorMinW = validacionMinWeight(input.min_weight, input.max_weight);
  const errorMaxW = validacionMaxWeight(input.min_weight, input.max_weight);
  const errorTempers = validacionTempers(input.temperaments);
  const errorMinLSpan = validacionMinLifeSpan(
    input.life_span_min,
    input.life_span_max
  );
  const errorMaxLSpan = validacionMaxLifeSpan(
    input.life_span_min,
    input.life_span_max
  );

  const functionGeneral = (
    iName,
    iImg,
    iMinH,
    iMaxH,
    iMinW,
    iMaxW,
    iTemper,
    iMinLS,
    iMaxLS
  ) => {
    if (
      iName === undefined &&
      iImg === undefined &&
      iMinH === undefined &&
      iMaxH === undefined &&
      iMinW === undefined &&
      iMaxW === undefined &&
      iTemper === undefined &&
      iMinLS === undefined &&
      iMaxLS === undefined
    ) {
      return undefined;
    } else {
      return true;
    }
  };

  const disableDesactivate = functionGeneral(
    errorName,
    errorImg,
    errorMinH,
    errorMaxH,
    errorMinW,
    errorMaxW,
    errorTempers,
    errorMinLSpan,
    errorMaxLSpan
  );

  // ---------------------------------render--------- --> ------the end----------------------------------------- -----------------------

  return (
    <div className="divGeneral">
      <Link to="/home">
        {" "}
        <button> Volver </button>
      </Link>

      <h1> Crear una nueva raza</h1>
      <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label> Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChangeName}
            // required
          />

          {input.name ? <p className="errorsMsj">{errorName}</p> : ""}
        </div>
        <div>
          <label> Altura minima: </label>
          <input
            type="number"
            value={input.min_height}
            name="min_height"
            onChange={handleChange}
            // required
          />
          {input.min_height ? <p className="errorsMsj">{errorMinH}</p> : ""}
        </div>
        <div>
          <label> Altura maxima: </label>
          <input
            type="number"
            value={input.max_height}
            name="max_height"
            onChange={handleChange}
            // required
          />
          {input.max_height ? <p className="errorsMsj">{errorMaxH}</p> : ""}
        </div>
        <div>
          <label> Peso minimo: </label>
          <input
            type="number"
            value={input.min_weight}
            name="min_weight"
            onChange={handleChange}
            // required
          />
          {input.min_weight ? <p className="errorsMsj">{errorMinW}</p> : ""}
        </div>
        <div>
          <label> Peso maximo: </label>
          <input
            type="number"
            value={input.max_weight}
            name="max_weight"
            onChange={handleChange}
            // required
          />
          {input.max_weight ? <p className="errorsMsj">{errorMaxW}</p> : ""}
        </div>
        <div>
          <label> Minima longevidad: </label>
          <input
            type="number"
            value={input.life_span_min}
            name="life_span_min"
            onChange={handleChange}
            // required
          />
          {input.life_span_min ? (
            <p className="errorsMsj">{errorMinLSpan}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label> Maxima longevidad: </label>
          <input
            type="number"
            value={input.life_span_max}
            name="life_span_max"
            onChange={handleChange}
            // required
          />
          {input.life_span_max ? (
            <p className="errorsMsj">{errorMaxLSpan}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label> Imagen: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChangeName}
            // required
          />
          {input.image ? <p className="errorsMsj">{errorImg}</p> : ""}
        </div>
        <select onChange={handleSelect}>
          {allTemps.map((temp) => (
            <option value={temp.name}> {temp.name} </option>
          ))}
        </select>
        {input.temperaments ? <p className="errorsMsj">{errorTempers}</p> : ""}
        <button type="submit" disabled={disableDesactivate}>
          Crear personaje
        </button>
      </form>
      <div>
        <p>
          {input.temperaments.map((el) => {
            return (
              <div className="tempsPick">
                {el}

                <button
                  className="btn"
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  x
                </button>
              </div>
            );
          })}
        </p>
      </div>
    </div>
  );
}
