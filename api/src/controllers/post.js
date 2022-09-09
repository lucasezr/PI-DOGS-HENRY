// if (!name || !min_weight) {
//     //|| !life_span_min
//     res
//       .status(200)
//       .send("Datos incompletos. Por favor ingrese los datos obligatorios");
//   }

//   try {
//     const newDog = await Dog.create({
//       //cambio1 findOrCreate
//       where: {
//         // id: dbId,
//         name: name,
//         min_height: min_height,
//         max_height: max_height,
//         min_weight: min_weight,
//         max_weight: max_weight,
//         life_span_min: life_span_min,
//         life_span_max: life_span_max,
//         image: image,
//         createdInDb: true,
//       },
//     });
//     // console.log(newDog);

//     let matchTemperament = await Temperament.findAll({
//       where: {
//         name: temperaments,
//       },
//     });
//     await newDog.addTemperament(matchTemperament);
//     console.log(matchTemperament);

//     if (newDog) {
//       console.log("Raza creada con exito!");
//       // console.log(getDogsDb);
//       return res.status(200).send(newDog);
//     }
//     //else {
//     //   res.status(200).json({
//     //     message:
//     //       "Ya existe una raza creada con las mismas caracteristicas ingresadas.",
//     //     Dog: ,
//     //   });
//     // }
//   } catch (err) {
//     res.status(404).send(err);
//     console.log(err);
//   }
// };
//----------------------------------------------------------------------------------------------------------//
//   const obj = {
//     name,
//     min_height,
//     max_height,
//     min_weight,
//     max_weight,
//     min_life_span,
//     max_life_span,
//     life_span_min,
//     life_span_max,
//     img,
//     createdInDb: true,
//   };

//   try {
//     let newDog = await Dog.create(obj);

//     let matchTemperament = await Temperament.findAll({
//       where: { name: temperaments },
//     });
//     newDog.addTemperament(matchTemperament);
//     console.log(matchTemperament);

//   } catch (err) {
//     res.status(404).send("Ocurrio un error!" + err);
//   }
// };

//--------------------------------------------------------------------------------------------------------------------//

//   try {
//     const newDog = await Dog.findOrCreate({
//       //cambio1 findOrCreate
//       where: {
//         id: ++dbId,
//         name: name,
//         min_height: min_height,
//         max_height: max_height,
//         min_weight: min_weight,
//         max_weight: max_weight,
//         life_span_min: life_span_min,
//         life_span_max: life_span_max,
//         image: image,
//         createdInDb: true,
//       },
//     });
//     // console.log(newDog);

//     let matchTemperament = await Temperament.findAll({
//       where: {
//         name: temperaments,
//       },
//     });
//     await newDog[0].addTemperament(matchTemperament);
//     console.log(matchTemperament);

//     if (newDog[1]) {
//       console.log("Raza creada con exito!");
//       // console.log(getDogsDb);
//       return res.status(200).send(newDog[0]);
//     } else {
//       res.status(200).json({
//         message:
//           "Ya existe una raza creada con las mismas caracteristicas ingresadas.",
//         Dog: newDog[0],
//       });
//     }
//   } catch (err) {
//     res.status(404).send("Ocurrio un error!");
//     console.log(err);
//   }
// };
