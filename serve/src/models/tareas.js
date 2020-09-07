'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {
    static associate(models) {
      Tareas.belongsTo(models.Clases, { as: "clases", foreignKey: "idClase" })
    }
  };
  Tareas.init({
    detalle: DataTypes.STRING,
    deberArchivo: DataTypes.STRING,
    nota: DataTypes.STRING,
    horaEntrega: DataTypes.INTEGER,
    horaEntregada: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Tareas',
  });
  return Tareas;
};