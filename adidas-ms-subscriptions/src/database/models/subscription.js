'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  };
  subscription.init({
    id: {type: DataTypes.UUID, primaryKey: true},
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    consent: DataTypes.BOOLEAN,
    birth_day: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'subscription',
  });
  return subscription;
};