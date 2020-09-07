'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materias extends Model {

    static associate(models) {
      Materias.belongsTo(models.Profesores, { as: "profesores", foreignKey: "idProfesor"})
      Materias.belongsTo(models.Cursos, { as: "cursos", foreignKey: "idCurso"})
    }
  };
  Materias.init({
    nombreMateria: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Materias',
  });
  return Materias;
};