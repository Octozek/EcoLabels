const router = require('express').Router();
const { Animal, Category, Tag, AnimalTag } = require('../../models');

// The `/api/animals` endpoint

// Get all Animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.findAll({
      attributes: ['id', 'animal_species', 'scientificName', 'country', 'information_link'], // Include information_link
      include: [
        {
          model: Category,
          attributes: [], // Exclude all category fields
        },
        {
          model: Tag,
          attributes: [], // Exclude all tag fields
          through: { attributes: [] }, // Exclude AnimalTag table attributes from response
        },
      ],
    });
    res.json(animals);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get all animal species
router.get('/species', async (req, res) => {
  try {
    const animals = await Animal.findAll({
      attributes: ['id', 'animal_species']
    });
    res.json(animals);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one Animal by ID
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id, {
      attributes: ['id', 'animal_species', 'scientificName', 'country', 'information_link'], // Include information_link
      include: [
        {
          model: Category,
          attributes: [], // Exclude all category fields
        },
        {
          model: Tag,
          attributes: [], // Exclude all tag fields
          through: { attributes: [] }, // Exclude AnimalTag table attributes from response
        },
      ],
    });
    if (!animal) {
      res.status(404).json({ message: 'No animal found with this id' });
      return;
    }
    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create new Animal
router.post('/', async (req, res) => {
  try {
      const animal = await Animal.create(req.body);
      // Optionally handle related tags
      if (req.body.tagIds && req.body.tagIds.length) {
          const animalTagIdArr = req.body.tagIds.map(tag_id => ({ animal_id: animal.id, tag_id }));
          await AnimalTag.bulkCreate(animalTagIdArr);
      }
      // Redirect or send success message
      res.status(201).redirect('/api/animals');  // Redirecting to the list of animals, or to a success page
  } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message, message: "Error creating animal" });
  }
});

// Update Animal by ID
router.put('/:id', async (req, res) => {
  try {
    const animal = await Animal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (req.body.tagIds && req.body.tagIds.length) {
      await AnimalTag.destroy({ where: { animal_id: req.params.id } });
      const animalTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          animal_id: req.params.id,
          tag_id,
        };
      });
      await AnimalTag.bulkCreate(animalTagIdArr);
    }
    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete Animal by ID
router.delete('/:id', async (req, res) => {
  try {
    const animal = await Animal.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!animal) {
      res.status(404).json({ message: 'No Animal found with this id' });
      return;
    }
    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;