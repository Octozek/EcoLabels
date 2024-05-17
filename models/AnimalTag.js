const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AnimalTag extends Model {}

AnimalTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    animal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Animal',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'AnimalTag'
  }
);

module.exports = AnimalTag;
