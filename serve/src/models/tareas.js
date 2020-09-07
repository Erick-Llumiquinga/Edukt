'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tareas.belongsTo(models.Personas, { as: "personas", foreignKey: "personasId" })
    }
  };
  Tareas.init({
    detalle: DataTypes.STRING,
    deber_archivo: DataTypes.STRING,
    nota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tareas',
  });
  return Tareas;
};