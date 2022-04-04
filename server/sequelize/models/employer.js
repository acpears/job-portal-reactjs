'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employer.init({
    company_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    security_question_id: DataTypes.INTEGER,
    security_question_answer: DataTypes.STRING,
    last_connected: DataTypes.DATE,
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Employer',
  });
  return Employer;
};