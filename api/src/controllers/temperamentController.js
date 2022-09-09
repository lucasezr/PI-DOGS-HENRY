const axios = require("axios");
const { Temperament } = require("../db");

//----------------------  TRAIGO TODOS LOS TEMPS DE LA API  ----------------------------------------------

const createTemperament = async () => {
  const infoApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiTemp = await infoApi.data.map((e) =>
    e.temperament ? e.temperament : undefined
  );

  const filterTemp = [
    ...new Set(apiTemp.join(",").replace(/ /g, "").split(",").sort()),
  ];

  filterTemp[0] = "Todos";

  filterTemp?.forEach(
    async (tem) => await Temperament.findOrCreate({ where: { name: tem } })
  );
}; //llamar a los temps de la api y crearlos / buscarlos

// buscar en la db los temps y los devuelve
const allTempApi = async (req, res) => {
  try {
    const prueba = await Temperament.findAll();
    // console.log(prueba);
    res.status(200).json(prueba);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

module.exports = { allTempApi, createTemperament };

// NOTAS: .join() -->
