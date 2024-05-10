const router = require('express').Router();
const { Animal, Category, Tag, AnimalnimalTag } = require('../../models');

// The `/api/Animal` endpoint

// get all Animal
router.get('/', async (req, res) => {
  try {
    const animal = await nimal.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: { attributes: [] }, // To exclude AnimalTag table attributes from response
        },
      ],
    });
    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one Animal
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: { attributes: [] }, // To exclude AnimalTag table attributes from response
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

// create new product
router.post('/', async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const animalTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          animal_id: animal.id,
          tag_id,
        };
      });
      await animalTag.bulkCreate(animalTagIdArr);
    }
    res.status(200).json(animal);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update Animal
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