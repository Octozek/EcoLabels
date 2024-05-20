# EcoLabels

EcoLabels is a web application designed to generate educational labels for animals and insects. The application allows users to create labels with animal details, generate SVG representations of these labels, and save them to their profiles. Admin users can manage animal data within the system.

## Table of Contents

- [EcoLabels](#ecolabels)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Routes](#routes)
    - [API Routes](#api-routes)
      - [User Routes:](#user-routes)
      - [Animal Routes:](#animal-routes)
      - [Admin Routes:](#admin-routes)
      - [Label Routes:](#label-routes)
    - [Views Routes](#views-routes)
  - [Database Models](#database-models)
    - [User](#user)
    - [Animal](#animal)
    - [Label](#label)
    - [Category](#category)
    - [Tag](#tag)
    - [AnimalTag](#animaltag)
  - [License](#license)
  - [Contributing](#contributing)

## Features

- User authentication and authorization.
- Admin panel for managing animal data.
- Generation of SVG labels for animals.
- Saving generated labels to user profiles.
- Displaying saved labels on user profiles.

## Technologies

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- Handlebars.js (templating)
- Bootstrap (CSS framework)
- QRCode (QR code generation)
- Canvg (SVG to Canvas rendering)
- Express-session (session management)
- Connect-session-sequelize (session store for Sequelize)
-  Multer (middleware package)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/octozek/EcoLabels.git
   cd EcoLabels

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up the database:**

   - Create a MySQL database named `eco_labs_db`.
   - Configure the database connection in `config/connection.js`.

4. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

     ```env
     DB_NAME='eco_labs_db'
     DB_USER='root'
     DB_PW='password'
     SESSION_SECRET='your_secret_key'
     ```

5. **Run database migrations and seed data:**

   ```bash
   npm run seed

6. **Start the server:**

   ```bash
   npm start

## Usage

1. **Register a new account or log in if you already have an account.**

2. **Generate a label:**
   - Fill in the details of the animal on the home page and click "Generate Label".
   - Once the label is generated, click the "Save Label" button to save it to your profile.

3. **View saved labels:**
   - Go to your profile page to view all the labels you have saved.

## Routes

### API Routes

#### User Routes:

- `POST /api/users`: Create a new user.
- `POST /api/users/login`: Log in a user.
- `POST /api/users/logout`: Log out a user.
- `GET /api/users/saved-svgs`: Get all saved labels for the logged-in user.
- `POST /api/users/save-label`: Save a label for the logged-in user.

#### Animal Routes:

- `GET /api/animals`: Get all animals.
- `GET /api/animals/species`: Get all animal species.
- `GET /api/animals/:id`: Get a single animal by ID.
- `POST /api/animals`: Create a new animal.
- `PUT /api/animals/:id`: Update an animal by ID.
- `DELETE /api/animals/:id`: Delete an animal by ID.

#### Admin Routes:

- `POST /api/admin/animals`: Create a new animal (admin only).

#### Label Routes:

- `POST /api/save-label`: Save a generated label to the user's profile.

### Views Routes

- `GET /`: Home page.
- `GET /login`: Login page.
- `GET /register`: Registration page.
- `GET /profile`: User profile page.
- `GET /admin-add-animal`: Admin page to add a new animal.

## Database Models

### User

- `id`: Integer, Primary Key, Auto Increment
- `username`: String, Unique, Not Null
- `email`: String, Unique, Not Null
- `password`: String, Not Null
- `isAdmin`: Boolean, Default: false

### Animal

- `id`: Integer, Primary Key, Auto Increment
- `animal_species`: String, Not Null
- `scientificName`: String, Not Null
- `country`: String, Not Null
- `information_link`: String, Not Null
- `category_id`: Integer, Foreign Key

### Label

- `id`: Integer, Primary Key, Auto Increment
- `labelContent`: Text, Not Null
- `user_id`: Integer, Foreign Key

### Category

- `id`: Integer, Primary Key, Auto Increment
- `category_name`: String, Not Null

### Tag

- `id`: Integer, Primary Key, Auto Increment
- `tag_name`: String, Not Null

### AnimalTag

- `animal_id`: Integer, Foreign Key
- `tag_id`: Integer, Foreign Key

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.
