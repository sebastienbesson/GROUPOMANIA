'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'comments', 
        'postId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'posts', 
            key: 'id', 
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'comments', 
        'postId',
        
        )
  }
};
