'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return Promise.all([
      queryInterface.addColumn('users', 'contentUrl', {
        allowNull: false,
        type: Sequelize.STRING
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
     return Promise.all([queryInterface.removeColumn('users', 'contentUrl')]);
  }
};
