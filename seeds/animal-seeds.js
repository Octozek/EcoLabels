const { Product } = require('../models');

const productData = [
  {
    animal_name: 'Plain T-Shirt',
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    animal_name: 'Running Sneakers',
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    animal_name: 'Branded Baseball Hat',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    animal_name: 'Top 40 Music Compilation Vinyl Record',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    animal_name: 'Cargo Shorts',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;