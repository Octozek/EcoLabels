const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

// Inform Express about your view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(routes);

// Sync Sequelize models to the database on server start
sequelize.sync({ force: false }).then(() => {
    console.log('Sequelize models synced to the database');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// Set up sessions with cookies
//const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     // Stored in milliseconds
//     maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));