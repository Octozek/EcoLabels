const express = require('express');
const router = express.Router();

// Import sub-route modules
const apiRoutes = require('./api');

// Route to render the home page
router.get('/', (req, res) => {
    res.render('home');  // Ensure "home.handlebars" exists in your views directory
});

// API routes
router.use('/api', apiRoutes);

// Catch-all for any other requests which are not handled by above routes
router.use((req, res) => {
    res.status(404).send('Wrong Route!');
});

module.exports = router;
