'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.changeColumn(
      'comments', // name of Target model
      'postId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        
        
        onDelete: 'SET NULL',
      }
    );
  },
  

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn(
      'comments', // name of the Target model
      'postId' // key we want to remove
    );
  }
};
