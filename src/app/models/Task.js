import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        discipline: Sequelize.STRING,
        content: Sequelize.STRING,
        importance: Sequelize.STRING,
        term: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  }
}

export default Task;
