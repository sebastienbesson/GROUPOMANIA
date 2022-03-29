'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'comments', // name of Source model
      'postId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'comments', // name of Source model
      'id',
      'content',
      'createdAt',
      'updateAt',
      'userId' // key we want to remove 
    );
  }
};