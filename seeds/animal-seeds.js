const { Animal } = require('../models');

const animalData = [
  {
    animal_species: 'Komodo Dragon',
    scientificName: 'Varanus komodoensis',
    country: 'Indonesia',
    information_link: 'https://en.wikipedia.org/wiki/Komodo_dragon',  // Updated link
    category_id: 1,
  },
  {
    animal_species: 'Green Iguana',
    scientificName: 'Iguana iguana',
    country: 'Brazil',
    information_link: 'https://en.wikipedia.org/wiki/Green_iguana',  // Updated link
    category_id: 2,
  },
  {
    animal_species: 'American Alligator',
    scientificName: 'Alligator mississippiensis',
    country: 'USA',
    information_link: 'https://en.wikipedia.org/wiki/American_alligator',  // Updated link
    category_id: 3,
  },
  {
    animal_species: 'Poison Dart Frog',
    scientificName: 'Dendrobates tinctorius',
    country: 'Colombia',
    information_link: 'https://en.wikipedia.org/wiki/Poison_dart_frog',  // Updated link
    category_id: 4,
  },
  {
    animal_species: 'King Cobra',
    scientificName: 'Ophiophagus hannah',
    country: 'India',
    information_link: 'https://en.wikipedia.org/wiki/King_cobra',  // Updated link
    category_id: 5,
  },
];

const seedAnimals = () => Animal.bulkCreate(animalData);

module.exports = seedAnimals;
