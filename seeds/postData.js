const { Post } = require('../models');

const postData = [
    {
        title: "Handlebars is widely used in web development",
        contents: "Known for its simplicity, flexibility, and ease of use. It has become a popular choice for building dynamic web applications.",
        date_posted: "03/13/2023",
        user_id: 1
    },
    {
        title: "Benefits of Express.js",
        contents: "Provides a wide range of features and middleware that can be used to build everything from simple REST APIs to complex web applications.",
        date_posted: "01/12/2023",
        user_id: 2
    },
    {
        title: "Is technology growing exponentially?",
        contents: "Computers' speed and power have generally been doubling every one and a half to two years since the 1960s and 70s.",
        date_posted: "10/17/2022",
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;