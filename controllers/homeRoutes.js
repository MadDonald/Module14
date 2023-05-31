// We're bringing in all the tools we need
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// If a user is not logged in, show them the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// If a user is not logged in, show them the signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// When the user goes to the home page, show them all the posts and their comments
router.get("/", async (req, res) => {
  try {
    // Get all the posts from the database, including the comments and users linked to those posts
    const postData = await Post.findAll({
      attributes: ["id", "title", "contents", "date_posted", "user_id"],
      include: [
        { model: Comment, include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
      order: [["date_posted", "DESC"]],
    });

    // Convert the posts to simple objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Show the home page with all the posts, and a flag indicating whether the user is logged in
    res.render("home", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// When the user goes to a specific post URL, show them the post and its comments
router.get("/post/:id", async (req, res) => {
  try {
    // Get the post with its comments and the associated user
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "contents", "date_posted", "user_id"],
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: { model: User } },
      ],
    });

    // Convert the post to a simple object
    const post = postData.get({ plain: true });

    // Show the individual post, with a flag indicating whether the user is logged in
    res.render("post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// When the user goes to the edit URL for a post, show them the post to edit
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Get the post with its comments and the associated user
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "contents", "date_posted"],
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: { model: User } },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // Convert the post to a simple object
    const post = postData.get({ plain: true });

    // Show the post to edit, with a flag indicating whether the user is logged in
    res.render("update_post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// When the user goes to a specific comment URL, show them the comment
router.get("/comment/:id", async (req, res) => {
  try {
    // Get the comment and the associated user
    const commentData = await Comment.findByPk(req.params.id, {
      attributes: ["id", "contents", "date_posted", "post_id", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    // Convert the comment to a simple object
    const comment = commentData.get({ plain: true });

    // Show the comment, with a flag indicating whether the user is logged in
    res.render("comments", { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// When the user goes to the edit URL for a comment, show them the comment to edit
router.get("/edit-comment/:id", withAuth, async (req, res) => {
  try {
    // Get the comment and the associated user
    const commentData = await Comment.findByPk(req.params.id, {
      attributes: ["id", "contents", "date_posted", "post_id", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    // Convert the comment to a simple object
    const comment = commentData.get({ plain: true });

    // Show the comment to edit, with a flag indicating whether the user is logged in
    res.render("update_comment", { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Finally, we make this file available to other parts of our app
module.exports = router;
