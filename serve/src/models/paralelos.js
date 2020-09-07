'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paralelos extends Model {
    static associate(models) {
      Paralelos.belongsTo(models.Cursos, { as: "cursos", foreignKey: "idCurso" })
    }
  };
  Paralelos.init({
    paralelo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paralelos',
  });
  return Paralelos;
};