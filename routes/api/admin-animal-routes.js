const router = require('express').Router();
const { Animal, AnimalTag } = require('../../models');
const { withAdminAuth } = require('../../middleware/auth');

// Admin route to add a new animal
router.post('/', withAdminAuth, async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const animalTagIdArr = req.body.tagIds.map(tag_id => ({ animal_id: animal.id, tag_id }));
      await AnimalTag.bulkCreate(animalTagIdArr);
    }
    res.status(201).redirect('/admin-add-animal'); // Redirecting to admin page or a success page
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message, message: "Error creating animal" });
  }
});

module.exports = router;
