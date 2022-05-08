'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('users', 'isAdmin')]);
  },
};
