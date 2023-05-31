const { Comment } = require('../models');

const commentData = [
    {
     contents: "Very very good!",
     date_posted: "01/19/2023",
     post_id: 3,
     user_id: 1,
    },
    {
     contents: "Ya that tip is useful.",
     date_posted: "01/20/2023",
     post_id: 1,
     user_id: 2,
    },
    {
     contents: "very helpful blog post.",
     date_posted: "02/20/2023",
     post_id: 2,
     user_id: 3,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;