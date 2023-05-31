// Importing necessary modules
const router = require("express").Router();
const { User } = require("../../models");

// POST route for creating a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.user_id = userData.id;
    req.session.loggedIn = true;

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for user login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.loggedIn = true;

    res.json({ user: userData, message: "You have successfully logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for user logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
