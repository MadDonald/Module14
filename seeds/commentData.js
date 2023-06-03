const { Comment } = require('../models');

const commentData = [
    {
     contents: "Great job!",
     date_posted: "01/19/2023",
     post_id: 3,
     user_id: 1,
    },
    {
     contents: "very helpful.",
     date_posted: "01/20/2023",
     post_id: 1,
     user_id: 2,
    },
    {
     contents: "loved the post.",
     date_posted: "02/20/2023",
     post_id: 2,
     user_id: 3,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;