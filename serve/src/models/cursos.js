'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cursos extends Model {
    static associate(models) {
      Cursos.hasMany(models.Materias, { as: "materias", foreignKey: "idCurso" }),
      Cursos.hasMany(models.Clases, { as: "clases", foreignKey: "idCurso" }),
      Cursos.hasMany(models.Paralelos, { as: "paralelos", foreignKey: "idCurso" })
    }
  };
  Cursos.init({
    nombreCurso: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cursos',
  });
  return Cursos;
};