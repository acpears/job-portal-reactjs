'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Security_Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Security_Question.init({
    question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Security_Question',
    timestamps: false
  });
  return Security_Question;
};