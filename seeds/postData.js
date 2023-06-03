const { Post } = require('../models');

const postData = [
    {
        title: "10 things you need to know",
        contents: "Computers are great for the whole family.",
        date_posted: "03/13/2023",
        user_id: 1
    },
    {
        title: "How to clear your search history",
        contents: "click your history and delete all.",
        date_posted: "01/12/2023",
        user_id: 2
    },
    {
        title: "Can you download more ram?",
        contents: "No you can not.",
        date_posted: "10/17/2022",
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;