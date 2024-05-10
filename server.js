const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import the Sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync Sequelize models to the database on server start
sequelize.sync({ force: false }).then(() => {
  console.log('Sequelize models synced to the database');
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});