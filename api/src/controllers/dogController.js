const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { Op, where } = require("sequelize");
const axios = require("axios");
const db = require("../db");
let dbId = 264;
//---------------------------------- data Api -------------------------------------------------------------------------

const getAllDogsApi = async () => {
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");
  const dataApi = await api.data.map((el) => {
    const weight = el.weight.metric.split(" - ");
    const lifeSpan = el.life_span.split(" ");
    const height = el.height.metric.split(" - ");

    // console.log(height);
    return {
      id: el.id,
      name: el.name,
      min_height: height[0],
      max_height: height[1],
      min_weight: weight[0],
      max_weight: weight[1],
      life_span_min: lifeSpan[0],
      life_span_max: lifeSpan[2],
      image: el.image.url,
      createdInDb: false,
      temperaments: (el.temperament ? el.temperament.split(",") : ["n/a"]).map(
        (el) => el.trim()
      ),
    };
  });
  return dataApi;
};

// ----------------------------------------------------- Dogs db -------------------------------------------------------------------//

// const getFromDb = async () => {
//   const info = await Dog.findAll({
//     include: {
//       model: Temperament,
//       attributes: ["name"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
//       through: {
//         attributes: [], //traer mediante los atributos del modelo
//       },
//     },
//   });
//   return info;
// };

const DbBreeds = async () => {
  try {
    const db = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // console.log(db);
    const dbMap = db.map((e) => {
      return {
        id: e.id,
        name: e.name,
        min_height: e.min_height,
        max_height: e.max_height,
        min_weight: e.min_weight,
        max_weight: e.max_weight,
        life_span_min: e.life_span_min,
        life_span_max: e.life_span_max,
        image: e.image,
        temperaments: e.temperaments.map((e) => e.name),
        createdInDb: true,
      };
    });
    return dbMap;
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------DATA API Y DB--------------------------------------------------------------

const getDogsMixed = async () => {
  const dataFromApi = await getAllDogsApi();
  const dataFromDb = await DbBreeds();
  // const allDataMixed = dataFromApi.concat(dataFromDb);
  const allDataMixed = [...dataFromApi, ...dataFromDb];
  return allDataMixed;
};

// ------------------------------------- getAllDogs y Dogs x Query -----------------------------------------------------------------//

const getAllDogs = async (req, res) => {
  const allDogs = await getDogsMixed();
  const { name } = req.query;

  try {
    if (name) {
      const dogFilterQuery = allDogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      dogFilterQuery.length === 0
        ? res.send(
            "La raza ingresada no es valida. Por favor ingresela correctamente"
          )
        : res.send(dogFilterQuery);
    } else {
      res.status(200).send(allDogs);
    }
  } catch (err) {
    console.log(err);
  }
};

//--------------------------------------------------- GET DOGS ID -----------------------------------------------------------

const getDogId = async (req, res) => {
  try {
    const dogsAll = await getDogsMixed();
    // console.log(dogsAll);

    const { id } = req.params;

    const dogFilterParam = await dogsAll.find(
      (el) => el.id === id || el.id === parseInt(id)
    );
    // console.log(dogFilterParam + "dogfilterPARAAAM");

    if (!dogFilterParam) {
      res.status(404).send("Id no encontrado, por favor ingrese otro.");
    }
    res.status(200).send(dogFilterParam);
  } catch (err) {
    console.log(err);
  }
};

//----------------------------------------------------- POST DOGS -----------------------------------------------------------
const postNewDog = async (req, res) => {
  const {
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    life_span_min,
    life_span_max,
    image,
    temperaments,
    createdInDb,
  } = req.body;

  try {
    const newDog = await Dog.create({
      //cambio1 findOrCreate
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      life_span_min,
      life_span_max,
      image,
      createdInDb: true, //cambiazo
    });

    // console.log("console.log de temperamentos: " + temperaments);

    let matchTemperament = await Temperament.findAll({
      where: {
        name: temperaments,
      },
    });
    // console.log(matchTemperament);
    // for (let i = 0; i < matchTemperament.length; i++) {
    //   console.log("esto es I:" + matchTemperament[i]);
    // }

    newDog.addTemperament(matchTemperament);

    // await newDog[0].addTemperament(matchTemperament);
    // console.log(matchTemperament);

    // if (newDog[1]) {
    //   console.log("Raza creada con exito!");

    res.status(200).send(newDog);
    // } else {
    //   res.status(200).json({
    //     message:
    //       "Ya existe una raza creada con las mismas caracteristicas ingresadas.",
    //     Dog: newDog[0],
    //   });
    // }
  } catch (err) {
    res.status(404).send("Ocurrio un error!");
    console.log("Ocurrio un error en el post! " + err);
  }
};

module.exports = {
  getAllDogsApi,
  getAllDogs,
  getDogId,
  postNewDog,
  getDogsMixed,
};

// const newDog = await Dog.findOrCreate({
//   where: {
//     name,
//     min_height,
//     max_height,
//     min_weight,
//     max_weight,
//     life_span_min,
//     life_span_max,
//     image,
//     createdInDb,
//   },
// });
