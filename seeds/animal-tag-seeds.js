const { AnimalTag } = require('../models');

const animalTagData = [
  {
    animal_id: 1,
    tag_id: 6,
  },
  {
    animal_id: 1,
    tag_id: 7,
  },
  {
    animal_id: 1,
    tag_id: 8,
  },
  {
    animal_id: 2,
    tag_id: 6,
  },
  {
    animal_id: 3,
    tag_id: 1,
  },
  {
    animal_id: 3,
    tag_id: 3,
  },
  {
    animal_id: 3,
    tag_id: 4,
  },
  {
    animal_id: 3,
    tag_id: 5,
  },
  {
    animal_id: 4,
    tag_id: 1,
  },
  {
    animal_id: 4,
    tag_id: 2,
  },
  {
    animal_id: 4,
    tag_id: 8,
  },
  {
    animal_id: 5,
    tag_id: 3,
  },
];

const seedAnimalTags = () => AnimalTag.bulkCreate(animalTagData);

module.exports = seedAnimalTags;