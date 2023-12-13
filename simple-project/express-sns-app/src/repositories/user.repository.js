const userModel = require('../models/user.model');

const findUserByEmail = (email) => {
  return userModel.findOne({email});
}

module.exports = {
  findUserByEmail
}