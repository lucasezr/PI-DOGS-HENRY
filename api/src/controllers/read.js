// const { Router } = require("express");
// const { Dog, Temperament } = require("../db");
// const { Op } = require("sequelize");
// const axios = require("axios");

// //------------------------------- data Api ----------------------------------//
// const api = axios.get("https://api.thedogapi.com/v1/breeds");
// const dataApi = async () => {
//   try {
//     const dataApiMap = api.data.map((e) => {
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
//   } catch (err) {
//     console.log(err);
//   }
// };
// console.log(dataApi);
// //-------- Mapeo la info de la API y me traigo a la BD la info que necesito ------//

// //----------------------- Get all Breeds && Get por query ---------------------//

// // Busca a todos los perros. Detecta si el usuario le paso un query param, en caso de que lo haya hecho solo le retorna el Breed buscado y si no existe, tira error.

// async function getAllBreeds(req, res) {
//   try {
//     const { name } = req.query;

//     if (!name) {
//       const allBreeds = await Breed.findAll({ include: Temperament });

//       //   console.log(allBreeds);
//       const allBreedMap = await allBreeds.map((el) => {
//         //----------- Separo el weight, height y life_span en min y max -------------//
//         const weight = el.weight.metric.split(" - ");
//         const lifeSpan = el.life_span.split(" ");
//         const height = el.height.metric.split(" - ");

//         console.log(weight);
//         //-----------------------------------------------------------------------------
//         // mapeo la informacion para pasarsela a la base de datos
//         return {
//           name: el.name,
//           min_height: height[0],
//           max_height: height[1],
//           min_weight: weight[0],
//           max_weight: weight[1],
//           life_span_min: lifeSpan[0],
//           life_span_max: lifeSpan[2],
//           image: el.image.url,
//           createdInDb: false,
//           //   temperament: el.Temperaments.map((el) => {
//           //     return el.name;
//           //   }),
//         };
//       });
//       console.log("llego con exito");
//       let allData = await allBreeds.concat(allBreedMap);
//       res.status(200).json(allData);
//     } else {
//       const findBreed = await Breed.findOne(
//         { where: { name: name } },
//         { include: Temperament }
//       );
//       if (!findBreed) {
//         res
//           .status(404)
//           .send(
//             "El nombre de la raza ingresado no es valido. Por favor ingrese un nombre correctamente"
//           );
//       } else {
//         res.status(200).json(findBreed);
//       }
//     }
//   } catch (err) {
//     res.status(404).send(err);
//   }
// }

// //-------------------------- Buscar por ID ----------------------------------//

// //Busca un Breed por params con el id ingresado y lo muestra. Si no lo encuentra o si se rompe el proceso, envia un error

// async function getBreedId(req, res) {
//   const { id } = req.params;
//   try {
//     if (!id) {
//       res.status(400).send("El id ingresado es inexistente");
//     } else {
//       const findBreedKey = await Breed.findByPk(id, { include: Temperament });
//       res.status(200).json(findBreedKey);
//     }
//   } catch (err) {
//     res.send(err);
//   }
// }

// //------------------------------- Post Breeds -------------------------------------//

// async function postNewBreed(req, res) {
//   const {
//     name,
//     min_height,
//     max_height,
//     min_weight,
//     max_weight,
//     life_span_min,
//     life_span_max,
//     image,
//     createdInDb,
//     Temperament,
//   } = req.body;

//   // Evaluo si se ingresaron todos los datos correctamente

//   if (
//     !name ||
//     !min_height ||
//     // !min_weight || en la tabla algunos son NaN
//     !life_span_min
//   ) {
//     return res.status(404).send("Ingresar los datos faltantes");
//   }
//   try {
//     const createBreed = await Breed.findOrCreate(
//       {
//         where: {
//           name: name,
//           min_height: min_height,
//           max_height: max_height,
//           min_weight: min_weight,
//           max_weight: max_weight,
//           life_span_min: life_span_min,
//           life_span_max: life_span_max,
//           image: image,
//         },
//         defaults: {
//           createdInDb,
//         },
//       }
//       //   { include: Temperament }
//       //   const matchTemp =
//     );
//     res.status(200).send(createBreed);
//   } catch (err) {
//     res.send(err);
//   }
// }

// // la defaults opción se usa para definir qué se debe crear en caso de que no se encuentre nada. Si defaults no contienen valores para cada columna, Sequelize tomará los valores proporcionados where(si están presentes).

// module.exports = { getAllBreeds, getBreedId, postNewBreed };

// // archivo auxiliar para guardar info
