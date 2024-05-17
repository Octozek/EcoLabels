const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const animalRoutes = require('./animal-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require('./user-routes');
const generateSvgRoutes = require('./generate-svg');
const adminRoutes = require('./admin-animal-routes');  // This is the route that will be used to access the admin-animal-routes.js file

router.use('/categories', categoryRoutes);
router.use('/animals', animalRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);
router.use('/generate-svg', generateSvgRoutes);
router.use('/admin', adminRoutes);  // This is the route that will be used to access the admin-animal-routes.js file

module.exports = router;
