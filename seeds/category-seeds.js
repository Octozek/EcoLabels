const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Reptiles', 
  },
  {
    category_name: 'Amphibians', 
  },
  {
    category_name: 'Insects', 
  },
  {
    category_name: 'Birds', 
  },
  {
    category_name: 'Mammals', 
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;