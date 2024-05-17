const router = require('express').Router();
const apiRoutes = require('./api');

// Main routes
router.get('/', (req, res) => {
    res.render('home');  // Renders home.handlebars
});

router.get('/login', (req, res) => {
    res.render('login');  // Renders login.handlebars
});

router.get('/register', (req, res) => {
    res.render('register');  // Renders register.handlebars
});

router.get('/add-animal', (req, res) => {
    res.render('add-animal');  // Renders add-animal.handlebars
});

router.get('/admin-add-animal', (req, res) => {
    res.render('admin-add-animal');  // Renders admin-add-animal.handlebars
});

// Mount API routes
router.use('/api', apiRoutes);

module.exports = router;
