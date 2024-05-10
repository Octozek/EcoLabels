const seedCategories = require('./category-seeds');
const seedAnimal = require('./animal-seeds');
const seedTags = require('./tag-seeds');
const seedAnimalTags = require('./animal-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedAnimal();
  console.log('\n----- Animal SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- Animal TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();