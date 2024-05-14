const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const AnimalRoutes = require('./animal-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/animals', AnimalRoutes);
router.use('/tags', tagRoutes);

module.exports = router;