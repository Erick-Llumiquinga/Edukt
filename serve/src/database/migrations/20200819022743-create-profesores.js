'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profesores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      correo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      clave: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idPersona: {
        type: Sequelize.INTEGER,
        references: {
          model: 'personas', 
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
    await queryInterface.dropTable('Profesores');
  }
};