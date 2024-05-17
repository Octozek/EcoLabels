const { User } = require("../models");
const bcrypt = require("bcrypt");

const adminUserData = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "password321", // Ensure the password is hashed
    isAdmin: true,
  },
];

const seedAdminUser = () =>
  User.bulkCreate(adminUserData, {
    individualHooks: true, // Ensure hooks are run to hash passwords
    returning: true,
  });

module.exports = seedAdminUser;
