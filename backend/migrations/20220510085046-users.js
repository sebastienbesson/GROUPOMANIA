'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allownull: false
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('users', 'isAdmin')]);
  }
};
