'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Personas extends Model {   
    static associate(models) {
      Personas.belongsTo(models.Roles, { as: "roles", foreignKey: "idRole" }),
      Personas.hasOne(models.Profesores, { as: "profesor", foreignKey: "idPersona"}),
      Personas.hasOne(models.Estudiantes, { as: "estudiantes", foreignKey: "idPersona"}),
      Personas.hasMany(models.Tareas, { as: "tarea", foreignKey: "personasId" }),
      Personas.hasMany(models.Clases, { as: "clases", foreignKey: "personasId" })
    }
  }; 

  Personas.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    identificacion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    contactoEmergencia: DataTypes.STRING,
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