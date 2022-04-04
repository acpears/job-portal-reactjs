'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seeker_Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seeker_Plan.init({
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seeker_Plan',
    timestamps: false
  });
  return Seeker_Plan;
};