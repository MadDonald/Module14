// Here we get the tools we need for this file
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// We have a route here for when users want to see their own posts
router.get("/", withAuth, async (req, res) => {
  try {
    // Fetch the user's posts from the database
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "contents", "date_posted"],
      order: [["date_posted", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Simplify the posts data to use in our handlebars template
    const posts = postData.map((post) => post.get({ plain: true }));

    // Show the dashboard page to the user, passing along the posts and a flag indicating the user is logged in
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    // If something went wrong, we log the error and send back an error response
    console.log(err);
    res.status(500).json(err);
  }
});

// Here we have a route for creating a new post
router.get("/post/create", withAuth, async (req, res) => {
  try {
    // Fetch the posts for the user again
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "contents", "date_posted"],
    });

    // Simplify the post data
    const post = postData.map((post) => post.get({ plain: true }));

    // Show the page for creating a post, passing along the existing posts and a flag indicating the user is logged in
    res.render("create-post", { post, loggedIn: true });
  } catch (err) {
    // Again, if something went wrong, we send back an error
    res.status(500).json(err);
  }
});

// Here's a route for viewing an individual post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Fetch the post that matches the id in the URL
    const postData = await Post.findByPk(req.params.id);

    // Simplify the post data
    const post = postData.get({ plain: true });

    // Show the page for the post, passing along the post data
    res.render("post", { post });
  } catch (err) {
    // Log and send back any errors that occur
    console.log(err);
    res.status(500).json(err);
  }
});

// We then make this file available to other parts of our app
module.exports = router;
