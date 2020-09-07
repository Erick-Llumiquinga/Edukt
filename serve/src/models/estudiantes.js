'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiantes extends Model {

    static associate(models) {
      Estudiantes.hasOne(models.Personas, { as: "personas", foreignKey: "idEstudiante" }),
      Estudiantes.hasOne(models.Matriculas, { as: "matriculas", foreignKey: "idMatricula" })
    }
  };
  Estudiantes.init({
    correo: DataTypes.STRING,
    clave: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Estudiantes',
  });
  return Estudiantes;
};