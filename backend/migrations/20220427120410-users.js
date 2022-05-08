'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allownull: false,
      defaultValue: 1
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('users', 'isAdmin')]);
  }
};
