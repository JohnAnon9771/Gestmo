module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      discipline: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true
      },
      importance: {
        type: Sequelize.STRING,
        allowNull: true
      },
      term: {
        type: Sequelize.DATE,
        allNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tasks');
  }
};
