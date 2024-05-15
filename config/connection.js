require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.ECO_labs_db
  ? new Sequelize(process.env.ECO_labs_db)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;