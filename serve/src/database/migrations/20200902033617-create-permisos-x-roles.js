'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permisos_x_Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idRole: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', 
          key: 'id',
        },
      },
      idPermisos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permisos', 
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
    await queryInterface.dropTable('Permisos_x_Roles');
  }
};