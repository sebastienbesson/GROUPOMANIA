'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'isAdmin', {
        allownull: false,
        type: Sequelize.BOOLEAN
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('users', 'isAdmin')]);
  }
};
