const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

const app = express();
const sequelize = require('./config/connection'); // Ensure your DB connection is correctly imported

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ /* any configurations */ });

// Inform Express about your view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Session configuration
const sess = {
    secret: 'Super secret secret', // Use an environment variable here instead in production
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// Serve static files from the public directory
app.use(express.static('public'));

// Sync Sequelize models to the database on server start
sequelize.sync({ force: false }).then(() => {
    console.log('Sequelize models synced to the database');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
