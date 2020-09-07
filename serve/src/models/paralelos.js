'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paralelos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paralelos.belongsTo(models.Curso, { as: "cursos", foreignKey: "cursoId" })
    }
  };
  Paralelos.init({
    nombre_paralelo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paralelos',
  });
  return Paralelos;
};