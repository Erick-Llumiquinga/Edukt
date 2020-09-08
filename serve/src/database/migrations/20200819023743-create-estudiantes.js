'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estudiantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      correo: {
        type: Sequelize.STRING
      },
      clave: {
        type: Sequelize.STRING
      },
      idMatricula: {
        type: Sequelize.INTEGER,
        references: {
          model: 'matriculas', 
          key: 'id',
        },
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
    await queryInterface.dropTable('Estudiantes');
  }
};