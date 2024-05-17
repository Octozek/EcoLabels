const seedCategories = require('./category-seeds');
const seedAnimals = require('./animal-seeds');
const seedTags = require('./tag-seeds');
const seedAnimalTags = require('./animal-tag-seeds');
const seedAdminUser = require('./admin-user-seeds');  // Include admin user seeds

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true }); // Syncs the models with the database

    console.log('\n----- DATABASE SYNCED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedAnimals();
    console.log('\n----- ANIMALS SEEDED -----\n');

    await seedTags();
    console.log('\n----- TAGS SEEDED -----\n');

    await seedAnimalTags();
    console.log('\n----- ANIMAL TAGS SEEDED -----\n');

    await seedAdminUser();  // Seed the admin user
    console.log('\n----- ADMIN USER SEEDED -----\n');

  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

seedAll();
