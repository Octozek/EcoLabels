const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const animalRoutes = require('./animal-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require('./user-routes');
const generateSvgRoutes = require('./generate-svg');

router.use('/categories', categoryRoutes);
router.use('/animals', animalRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);
router.use('/generate-svg', generateSvgRoutes);

module.exports = router;
