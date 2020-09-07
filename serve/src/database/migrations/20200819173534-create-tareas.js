'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detalle: {
        type: Sequelize.STRING
      },
      deberArchivo: {
        type: Sequelize.STRING
      },
      nota: {
        type: Sequelize.STRING
      },
      horaEntrega: {
        type: Sequelize.INTEGER
      },
      horaEntregada: {
        type: Sequelize.INTEGER
      },
      idClase: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clases',
          key: 'id'
        }
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
    await queryInterface.dropTable('Tareas');
  }
};