const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model { }

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    animal_species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    information_link: {  // New field added
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,  // Validate that it is a URL
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Animal',
  }
);

module.exports = Animal;
