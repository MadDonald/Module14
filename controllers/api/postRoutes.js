// We're importing the necessary tools and models for this router
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route for creating a new post
router.post("/", withAuth, async (req, res) => {
  try {
    // We create a new post using the data provided in the request body
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // We send the new post back to the client with a status of 200 (success)
    res.status(200).json(newPost);
  } catch (err) {
    // If something goes wrong, we send a status of 500 (server error) back to the client
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for deleting a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // We try to find and delete the post with the provided ID
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If the post doesn't exist, we send a 404 status back to the client
    if (!deletedPost) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // If everything goes well, we send a success status back to the client
    res.status(200).json(deletedPost);
  } catch (err) {
    // If something goes wrong, we send a 500 status back to the client
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for updating a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    // We try to find and update the post with the provided ID
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If the post doesn't exist, we send a 404 status back to the client
    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // If everything goes well, we send the updated post back to the client with a 200 status
    res.status(200).json(updatedPost);
  } catch (err) {
    // If something goes wrong, we send a 500 status back to the client
    console.error(err);
    res.status(500).json(err);
  }
});

// We make this router available to the rest of our app
module.exports = router;
