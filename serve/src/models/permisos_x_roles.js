'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permisos_x_Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permisos_x_Roles.belongsTo(models.Roles, { as: "roles", foreignKey: "idRole" })
    }
    static associate(models) {
      Permisos_x_Roles.belongsTo(models.Permisos, { as: "permisos", foreignKey: "idPermisos" })
    }
  };
  Permisos_x_Roles.init({
    idRole: DataTypes.INTEGER,
    idPermisos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permisos_x_Roles',
  });
  return Permisos_x_Roles;
};