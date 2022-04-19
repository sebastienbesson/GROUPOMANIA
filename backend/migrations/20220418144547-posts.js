'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.removeColumn('posts', 'likes')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.changeColumn('posts', 'likes')
    ]);
  }
};
