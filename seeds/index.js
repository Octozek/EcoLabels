const seedCategories = require('./category-seeds');
const seedAnimals = require('./animal-seeds'); // Correct variable name
const seedTags = require('./tag-seeds');
const seedAnimalTags = require('./animal-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedAnimals();
    console.log('\n----- ANIMALS SEEDED -----\n');

    await seedTags();
    console.log('\n----- TAGS SEEDED -----\n');

    await seedAnimalTags();
    console.log('\n----- ANIMAL TAGS SEEDED -----\n');

  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

seedAll();
