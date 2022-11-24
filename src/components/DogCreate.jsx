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
      return `Cannot start with blank spaces.`;
    if (entrada.length <= 3) return `Very short name.`;
    if (entrada.length > 30) return `Very long name.`;
    if (regexS.numeros.test(entrada))
      return `Numbers are not allowed in this field.`;
    if (regexS.caracteresEsp.test(entrada))
      return `Special characters are not allowed in this field.`;
  };
  const validacionImg = (entrada) => {
    if (!regexS.url.test(entrada)) return `It must be a valid url.`;
  };
  const validacionMinHeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada1 < 15) return `The minimum value cannot be less than 15 cm.`;
    if (entrada1 > 70) return `The minimum value cannot be less than 70 cm.`;
    if (entrada1 > entrada2) {
      return `The minimum value cannot be greater than the max value.`;
    }
  };
  const validacionMaxHeigh = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada2 > 100)
      return `The maximum value cannot be greater than 100 cm.`;
    if (entrada2 < entrada1) {
      return `The maximum value cannot be less than the min value.`;
    }
  };
  const validacionMinWeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada1 < 1) return `The minimum value cannot be less than 1 kg.`;
    if (entrada1 > 70) return `The minimum value cannot be greater than 70 Kg.`;
    if (entrada1 > entrada2) {
      return `The minimum value cannot be greater than the max value.`;
    }
  };
  const validacionMaxWeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada2 > 100)
      return `The maximum value cannot be greater than 100 Kg.`;
    if (entrada2 < entrada1) {
      return `The maximum value cannot be less than the min value.`;
    }
  };
  const validacionTempers = (entrada) => {
    if (entrada.length < 1) {
      return `It is required that you at least have a temperament.`;
    }
    if (entrada.length > 12) {
      return `You cannot select more than 12 temperaments`;
    }
  };
  const validacionMinLifeSpan = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada1 < 6) return `The minimum value cannot be less than 6 years.`;
    if (entrada1 > 10) return `The minimum value cannot be less than 10 years.`;
    if (entrada1 > entrada2) {
      return `The minimum value cannot be greater than the maximum value.`;
    }
  };
  const validacionMaxLifeSpan = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return true;
    if (entrada2 > 16)
      return `The maximum value cannot be greater than 16 years.`;
    if (entrada2 < entrada1) {
      return `The maximum value cannot be less than the min value.`;
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
        <button className="btn-back"> Volver </button>
      </Link>

      {/* <h1> Create a new breed</h1> */}
      <br />
      <div className="form-container-gen">
        <div className="box1">
          <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
            <div className="createform-name">
              <label className="label-form"> Name:</label>
              <input
                className="input-form"
                type="text"
                value={input.name}
                name="name"
                onChange={handleChangeName}
                // required
              />

              {input.name ? <p className="errorMsg">{errorName}</p> : ""}
            </div>
            <div className="createform-minH">
              <label className="label-form"> Min height: </label>
              <input
                className="input-form"
                type="number"
                value={input.min_height}
                name="min_height"
                onChange={handleChange}
                // required
              />
              {input.min_height ? <p className="errorMsg">{errorMinH}</p> : ""}
            </div>
            <div className="createform-maxH">
              <label className="label-form"> Max height: </label>
              <input
                className="input-form"
                type="number"
                value={input.max_height}
                name="max_height"
                onChange={handleChange}
                // required
              />
              {input.max_height ? <p className="errorMsg">{errorMaxH}</p> : ""}
            </div>
            <div className="createform-minW">
              <label className="label-form"> Min weight: </label>
              <input
                className="input-form"
                type="number"
                value={input.min_weight}
                name="min_weight"
                onChange={handleChange}
                // required
              />
              {input.min_weight ? <p className="errorMsg">{errorMinW}</p> : ""}
            </div>
            <div className="createform-maxW">
              <label className="label-form"> Max weight: </label>
              <input
                className="input-form"
                type="number"
                value={input.max_weight}
                name="max_weight"
                onChange={handleChange}
                // required
              />
              {input.max_weight ? <p className="errorMsg">{errorMaxW}</p> : ""}
            </div>
            <div className="createform-lifeSpanMin">
              <label className="label-form"> Life span min: </label>
              <input
                className="input-form"
                type="number"
                value={input.life_span_min}
                name="life_span_min"
                onChange={handleChange}
                // required
              />
              {input.life_span_min ? (
                <p className="errorMsg">{errorMinLSpan}</p>
              ) : (
                ""
              )}
            </div>
            <div className="createform-lifeSpanMax">
              <label className="label-form"> Life span max: </label>
              <input
                className="input-form"
                type="number"
                value={input.life_span_max}
                name="life_span_max"
                onChange={handleChange}
                // required
              />
              {input.life_span_max ? (
                <p className="errorMsg">{errorMaxLSpan}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-image">
              <label className="label-form"> Image: </label>
              <input
                className="input-form"
                type="text"
                value={input.image}
                name="image"
                onChange={handleChangeName}
                // required
              />
              {input.image ? <p className="errorMsg">{errorImg}</p> : ""}
            </div>
            <div className="temps-form"></div>
            <select className="list-temperaments" onChange={handleSelect}>
              {allTemps.map((temp) => (
                <option value={temp.name}> {temp.name} </option>
              ))}
            </select>
            {input.temperaments ? (
              <p className="error-temps">{errorTempers}</p>
            ) : (
              ""
            )}
          </form>
          <div className="conteiner-tempsPick">
            <div className="element-temp">
              {input.temperaments.map((el) => {
                return (
                  <div className="tempsPick">
                    {el}

                    <button
                      className="btn-eliminate"
                      type="button"
                      key={el.id}
                      onClick={() => handleDelete(el)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="box2">
          <div className="imgcss">
            <img src="https://res.cloudinary.com/dr1n4zzvd/image/upload/v1669251991/createDogPc3_hr8ofv.png"></img>
          </div>
          <div className="btn-create-form">
            <button type="submit" disabled={disableDesactivate}>
              Create breed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
