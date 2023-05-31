const { User } = require('../models');

const userData = [
  {
    username: "Gabriel",
    password: "321password",
  },
  {
    username: "Jeff",
    password: "mynameisjeff",
  },
  {
    username: "Olana",
    password: "password123",
  },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;