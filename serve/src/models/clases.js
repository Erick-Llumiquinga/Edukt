'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clases extends Model {
    static associate(models) {
      Clases.hasMany(models.Tareas, { as: "tareas", foreignKey: "idClase" }),
      Clases.belongsTo(models.Cursos, { as: "cursos", foreignKey: "idCurso" })
    }
  };
  Clases.init({
    detalle: DataTypes.STRING,
    tareasRealizar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Clases',
  });
  return Clases;
};