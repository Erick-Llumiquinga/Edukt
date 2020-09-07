'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permisos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permisos.hasMany(models.Permisos_x_Roles, { as: "permisos_x_roles", foreignKey: "idPermisos" })
    }
  };
  Permisos.init({
    guard: DataTypes.STRING,
    permisos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permisos',
  });
  return Permisos;
};