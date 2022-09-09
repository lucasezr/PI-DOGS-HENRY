const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        // type: DataTypes.INTEGER,
        type: DataTypes.UUID,
        // unique: true,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      min_height: {
        type: DataTypes.STRING,
      },
      max_height: {
        type: DataTypes.STRING,
      },
      min_weight: {
        type: DataTypes.STRING,
      },
      max_weight: {
        type: DataTypes.STRING,
      },
      life_span_min: {
        type: DataTypes.STRING,
      },
      life_span_max: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
