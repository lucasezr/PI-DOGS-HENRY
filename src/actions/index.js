import axios from "axios";

// const GET_ALL_DOGS = "GET_ALL_DOGS"; // Considerado buena practica para reducir el margen de error

export function getAllDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_ALL_DOGS",
      payload: json.data,
    });
  };
}
export function getAllTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperaments");
    // console.log(json + "acaaaaaaaaaaaaaaaaaa");
    return dispatch({
      type: "GET_ALL_TEMPERAMENTS",
      payload: json.data,
    });
  };
}
// export function getDogs() {
//   return async function (dispatch) {
//     var json = await axios.get("http://localhost:3001/dogs");
//     return dispatch({
//       type: "GET_DOGS",
//       payload: json.data,
//     });
//   };
// }

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs", payload);
    // console.log(response);
    return response;
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function sortWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

// export function getByBreed(payload) {
//   return function (dispatch) {
//     return axios
//       .get(`/api/dogs?name=` + payload) //payload --> breed
//       .then((resp) => {
//         dispatch({
//           type: GET_DOGS_FOR_BREED,
//           payload: resp.data,
//         });
//       });
//   };
// }

export function filterByTemperament(payload) {
  return {
    type: "FILTER_TEMPERAMENT",
    payload,
  };
}

export function getNameDog(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: "GET_NAME_DOG",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
  };
}
