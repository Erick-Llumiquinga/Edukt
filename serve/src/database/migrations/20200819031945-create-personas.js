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
      name: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      identification: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      birthDay:{
        allowNull: true,
        type: Sequelize.DATE
      },
      correo: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      helpContact:{
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
      idProfesor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'profesores', 
          key: 'id',
        },
      },
      idEstudiante: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estudiantes', 
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