-- DROP DATABASE
DROP DATABASE IF EXISTS ECO_labs_db;

-- CREATE DATABASE
CREATE DATABASE ECO_labs_db;

-- USE the newly created database
USE ECO_labs_db;

-- CREATE TABLE categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- CREATE TABLE animals
CREATE TABLE animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_species VARCHAR(100) NOT NULL,
    scientificName VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    information_link VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- CREATE TABLE tags
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(100)
);

-- CREATE TABLE animal_tags (join table for many-to-many relationship)
CREATE TABLE animal_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT,
    tag_id INT,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);