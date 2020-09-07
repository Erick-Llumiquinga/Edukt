'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Personas extends Model {   
    static associate(models) {
      Personas.belongsTo(models.Roles, { as: "roles", foreignKey: "idRole" }),
      Personas.hasOne(models.Profesores, { as: "profesor", foreignKey: "idProfesor"}),
      Personas.hasOne(models.Estudiantes, { as: "estudiantes", foreignKey: "idEstudiante"}),
      Personas.hasMany(models.Tareas, { as: "tarea", foreignKey: "personasId" }),
      Personas.hasMany(models.Clases, { as: "clases", foreignKey: "personasId" })
    }
  }; 

  Personas.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    identification: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    correo: DataTypes.STRING,
    phone: DataTypes.STRING,
    helpContact: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Personas',
  });

 /* Personas.isAdmin = function(roles) {
    let tmArray = [];
    roles.forEach(role => tmArray.push(role.role));

    return tmArray.includes('admin');
  }
  

  Personas.isEstu = function(roles) {
    let tmArray = [];
    roles.forEach(role => tmArray.push(role.role));

    return tmArray.includes('estudiante');
  }

  Personas.isProfe = function(roles) {
    let tmArray = [];
    roles.forEach(role => tmArray.push(role.role));

    return tmArray.includes('profesor');
  }*/

  return Personas;
};