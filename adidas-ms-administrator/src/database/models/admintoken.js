'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class adminToken extends Model {
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
  adminToken.init({
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: uuidv4()},
    admin_user: DataTypes.STRING,
    password: DataTypes.STRING,
    is_valid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'adminToken',
  });
  return adminToken;
};