// We're importing the necessary tools and models for this router
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route for adding a new comment to a post
router.post("/", withAuth, async (req, res) => {
  try {
    // We create a new comment using the data provided in the request body
    const newComment = await Comment.create({
      contents: req.body.contents,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    // We send the new comment back to the client with a status of 200 (success)
    res.status(200).json(newComment);
  } catch (err) {
    // If something goes wrong, we log the error and send a status of 500 (server error) back to the client
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for updating an existing comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    // We try to find and update the comment with the provided ID
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If the comment doesn't exist, we send a 404 status back to the client
    if (!updatedComment) {
      res.status(404).json({ message: "No comment found with that id" });
      return;
    }

    // If everything goes well, we send the updated comment back to the client with a 200 status
    res.status(200).json(updatedComment);
  } catch (err) {
    // If something goes wrong, we log the error and send a 500 status back to the client
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for deleting an existing comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // We try to find and delete the comment with the provided ID
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If the comment doesn't exist, we send a 404 status back to the client
    if (!deletedComment) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }

    // If everything goes well, we send a success status back to the client
    res.status(200).json(deletedComment);
  } catch (err) {
    // If something goes wrong, we log the error and send a 500 status back to the client
    console.error(err);
    res.status(500).json(err);
  }
});

// We make this router available to the rest of our app
module.exports = router;
