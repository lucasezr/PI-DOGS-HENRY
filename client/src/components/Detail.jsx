import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import "../styles/detail.css";

export default function Detail(props) {
  console.log(props);

  const { id } = useParams();
  const myDog = useSelector((state) => state.detail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id)); // de esta forma accedo al id de un detalle
  }, [dispatch, id]);

  return (
    // <div className="img-fondo">
    <div className="divGen">
      <div className="content-divGen">
        <div className="box-contenedor">
          <div className="imageDetail">
            <img src={myDog.image} />
          </div>
          <hr className="separator-img" />
          <div className="cont-props">
            <div className="box-description">
              <div className="details">
                <div className="name"> Nombre: {myDog.name}</div>
                <div className="min-height">
                  {" "}
                  Minimun height: {myDog.min_height ? myDog.min_height : 0} cm
                </div>
                <div className="max-height">
                  {" "}
                  Maximun height:{" "}
                  {myDog.max_height ? myDog.max_height + " cm" : "-"}
                </div>
                <div className="min-weight-detail">
                  {" "}
                  Minimun weight: {myDog.min_weight ? myDog.min_weight : 0} kg
                </div>
                <div className="max-weight-detail">
                  {" "}
                  Maximun weight: {myDog.max_weight ? myDog.max_weight : 100} kg
                </div>
                <div className="lifespan-min">
                  Life span min: {myDog.life_span_min ? myDog.life_span_min : 0}{" "}
                  years
                </div>
                <div className="lifespan-max">
                  Life Span max:{" "}
                  {myDog.life_span_max ? myDog.life_span_max : 100} years
                </div>
              </div>
              <hr className="div-temp-description" />
              <div className="box-temperaments">
                Temperaments:
                {myDog.temperaments?.map((e) => {
                  return <p className="temperaments-list">{e}</p>;
                })}
              </div>
            </div>
          </div>
          <Link className="btn-detail-back" to={"/home"}>
            {" "}
            <button> Volver </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// for (var i = 0; i < entries.length ; i++) {

//     if(i === 1 && entries[i] && entries[i][1] !== ['name' ]){
//         entries.splice(1,0,['name', ''])
//     } else {
//         continue
//     }
//     if (i === 2 && entries[i] && entries[i][1] !== 'min_height') {   //recorriendo el entries -> si esta en la segunda posicion y el segundo elemento es distinto de
//         entries.splice(2,0, ['min_height', ''])
//     } else {
//         continue
//     }

//     if ( i === 3 && entries[i] && entries[i][1] !== 'max_height'){
//         entries.splice (3,0, ['max_height', ''])
//     } else {
//         continue
//     }

//     if ( i === 4 && entries[i] && entries[i][1] !== 'min_weight'){
//         entries.splice (4,0, ['min_weight', ''])
//     } else {
//         continue
//     }

//     if ( i === 5  && entries[i] && entries[i][1] !== 'max_weight'){
//         entries.splice (5,0, ['max_weight', ''])
//     } else {
//         contui
//     }

//     if ( i === 6 && entries[i] && entries[i][1] !== 'life_span_min'){
//         entries.splice (6,0, ['life_span_min', ''])
//     }

//     if ( i === 7 && entries[i] && entries[i][1] !== 'life_span_max'){
//         entries.splice (7,0, ['life_span_max', ''])
//     }

//     if ( i === 10 && entries[i] && entries[10][1] !== 'temperaments'){
//         entries.splice (10,0, ['temperaments', 'No tiene temperamentos'])
//     }
// }
