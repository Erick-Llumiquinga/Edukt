'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    
    static associate(models) {
      Matriculas.hasOne(models.Estudiantes, { as: "estudiantes", foreignKey: "idMatricula"})
    }
  };
  Matriculas.init({
    codigoMatricula: DataTypes.STRING,
    numeroMatricula: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
  });
  return Matriculas;
};