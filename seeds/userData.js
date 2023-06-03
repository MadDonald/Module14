const { User } = require('../models');

const userData = [
  {
    username: "Jacob",
    password: "123password",
  },
  {
    username: "Jim",
    password: "Jimmy89",
  },
  {
    username: "Frank",
    password: "OldDog1920",
  },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;