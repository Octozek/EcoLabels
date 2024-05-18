const { Animal } = require('../models');

const animalData = [
  {
    animal_species: 'Komodo Dragon',
    scientificName: 'Varanus komodoensis',
    country: 'Indonesia',
    information_link: 'https://en.wikipedia.org/wiki/Komodo_dragon',  // Updated link
    category_id: 1,
    country_svg_path: '/imgs/svg/Australia-BeardedDragon.svg',
  },
  {
    animal_species: 'Green Iguana',
    scientificName: 'Iguana iguana',
    country: 'Brazil',
    information_link: 'https://en.wikipedia.org/wiki/Green_iguana',  // Updated link
    category_id: 2,
    // country_svg_path: '/images/svg/brazil.svg',
  },
  {
    animal_species: 'American Alligator',
    scientificName: 'Alligator mississippiensis',
    country: 'USA',
    information_link: 'https://en.wikipedia.org/wiki/American_alligator',  // Updated link
    category_id: 3,
    // country_svg_path: '/images/svg/north-america.svg',
  },
  {
    animal_species: 'Poison Dart Frog',
    scientificName: 'Dendrobates tinctorius',
    country: 'Colombia',
    information_link: 'https://en.wikipedia.org/wiki/Poison_dart_frog',  // Updated link
    category_id: 4,
    // country_svg_path: '/images/svg/colombia.svg',
  },
  {
    animal_species: 'King Cobra',
    scientificName: 'Ophiophagus hannah',
    country: 'India',
    information_link: 'https://en.wikipedia.org/wiki/King_cobra',  // Updated link
    category_id: 5,
    // country_svg_path: '/images/svg/india.svg',
  },
];

const seedAnimals = () => Animal.bulkCreate(animalData);

module.exports = seedAnimals;
