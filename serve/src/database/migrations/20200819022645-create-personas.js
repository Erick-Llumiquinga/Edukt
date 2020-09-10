'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      identificacion: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      fechaNacimiento:{
        allowNull: true,
        type: Sequelize.DATE
      },
      correo: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      contactoEmergencia:{
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      idRole: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', 
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Personas');
  }
};