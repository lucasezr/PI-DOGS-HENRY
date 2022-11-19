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
      <img className="imageDetail" src={myDog.image} />

      <div className="cont-props">
        <div> Nombre: {myDog.name}</div>
        <div>
          {" "}
          Altura minima:{myDog.min_height ? myDog.min_height + "cm" : " "}
        </div>
        <div>
          {" "}
          Altura maxima: {myDog.max_height ? myDog.max_height + "cm" : "-"}
        </div>
        <div> Peso minimo: {myDog.min_weight ? myDog.min_weight : 0}kg</div>
        <div> Peso maximo: {myDog.max_weight ? myDog.max_weight : 100} kg</div>
        <div>
          Longevidad minima: {myDog.life_span_min ? myDog.life_span_min : 0}{" "}
          años
        </div>
        <div>
          Longevidad maxima: {myDog.life_span_max ? myDog.life_span_max : 100}
          años
        </div>
        <div>
          Temperamentos:
          {myDog.temperaments?.map((e) => {
            return <p>{e}</p>;
          })}
        </div>
      </div>
      <Link to={"/home"}>
        {" "}
        <button> Volver </button>
      </Link>
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
