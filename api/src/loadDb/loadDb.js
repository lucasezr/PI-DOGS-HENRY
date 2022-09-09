// const { Router } = require("express");
// const { Dog, Temperament } = require("../db");
// const axios = require("axios");

// const router = Router;

// const loadDB = async () => {};
// try {
//   // const fullTable = await Breed.count(); // Checkeo que la db tenga contenido otra alternativa es directamente usar un (Dog.length < 1) en el if
//   if (!fullTable) {
//     const api = await axios.get("https://api.thedogapi.com/v1/breeds");

//     //-------- Mapeo la info de la API y me traigo a la BD la info que necesito ------//

//     const dataApi = api.data.map((e) => {
//       // ---------------------- Separo el weight min y max --------------------------//

//       // const weight = e.weight.metric.split(" - ");

//       // Desde el front voy a tener que verificar si weight tiene una longitud de 1 solo,
//       // voy a tener que renderizar una parte del detalle que sea height (sin min ni max)

//       //------------------------ separo Life_span Min y max -------------------------//

//       // const lifeSpan = e.life_span.split(" ");

//       // ---------------------- Separo el height min y max --------------------------//

//       // const height = e.height.metric.split(" - ");
//       //-----------------------------------------------------------------------------//
//       return {
//         id: e.id,
//         name: e.name,
//         min_height: e.min_height,
//         max_height: e.max_height,
//         min_weight: e.min_weight,
//         max_weight: e.max_weight,
//         life_span_min: e.life_span_min,
//         life_span_max: e.life_span_max,
//         image: e.image.url,
//         createdInDb: false,
//         temperament: e.temperament,
//       };
//     });
//   }
// } catch (err) {
//   console.log(err);
// }

// module.exports = { loadDB };
