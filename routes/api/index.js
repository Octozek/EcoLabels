const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const animalRoutes = require('./animal-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require('./user-routes');
const generateSvgRoutes = require('./generate-svg');
const adminRoutes = require('./admin-animal-routes'); 

router.use('/categories', categoryRoutes);
router.use('/animals', animalRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);
router.use('/generate-svg', generateSvgRoutes);
router.use('/admin', adminRoutes); 

module.exports = router;
