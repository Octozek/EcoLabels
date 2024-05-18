const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    animal_species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    information_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    country_svg_path: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Animal'
  }
);

module.exports = Animal;
