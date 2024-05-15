const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    res.render('home');  // Renders home.hbs
});

router.get('/login', (req, res) => {
    res.render('login');  // Renders login.hbs
});

module.exports = router;
