'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.removeColumn('posts', 'name')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.changeColumn('posts', 'name')
    ]);
  }
};
