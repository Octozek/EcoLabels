const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Carnivore',
  },
  {
    tag_name: 'Herbivore',
  },
  {
    tag_name: 'Reptile',
  },
  {
    tag_name: 'Amphibian',
  },
  {
    tag_name: 'Endangered',
  },
  {
    tag_name: 'Nocturnal',
  },
  {
    tag_name: 'Aquatic',
  },
  {
    tag_name: 'Terrestrial',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
