const router = require('express').Router();
const { Animal, AnimalTag } = require('../../models');
const { withAdminAuth } = require('../../middleware/auth');

// Admin route to add a new animal
router.post('/', withAdminAuth, async (req, res) => {
  const { animal_species, scientificName, country, information_link, tagIds } = req.body;
  console.log('Request Body:', req.body);
  if (!animal_species || !scientificName || !information_link) {
    return res.status(400).json({ error: 'All fields are required', message: 'Error creating animal' });
  }

  try {
    const animal = await Animal.create({
      animal_species,
      scientificName,
      country,
      information_link
    });

    if (tagIds && tagIds.length) {
      const animalTagIdArr = tagIds.map(tag_id => ({ animal_id: animal.id, tag_id }));
      await AnimalTag.bulkCreate(animalTagIdArr);
    }

    res.status(201).redirect('/admin-add-animal'); // Redirect to admin page or a success page
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message, message: "Error creating animal" });
  }
});

module.exports = router;