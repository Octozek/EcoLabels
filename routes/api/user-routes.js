const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  console.log("User Creation", req.body);
  try {
    console.log(req.body);
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.isAdmin = userData.isAdmin; // Set isAdmin flag
      console.log(userData);
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("User Creation in login", req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.isAdmin = userData.isAdmin; // Set isAdmin flag
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
