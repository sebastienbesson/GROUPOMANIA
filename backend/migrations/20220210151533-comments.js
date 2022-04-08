'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return Promise.all([
      queryInterface.removeColumn('comments', 'name')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
     return Promise.all([
       queryInterface.changeColumn('comments', 'name')
      ]);
  }
};
