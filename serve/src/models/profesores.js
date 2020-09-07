'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesores extends Model {
    
    static associate(models) {
      Profesores.hasOne(models.Personas, { as: "personas", foreignKey: "idProfesor"}),
      Profesores.hasMany(models.Materias, { as: "materias", foreignKey: "idProfesor"})
    }
  };
  Profesores.init({
    correo: DataTypes.STRING,
    clave: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profesores',
  });
  return Profesores;
};