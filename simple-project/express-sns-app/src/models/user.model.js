const mongoose = require('mongoose')
const {Schema} = require('mongoose');

const userSchema = new Schema({
  email:String,
  username:String,
  password:String,
  googleId:String,
  kakaoId:String
});

userSchema.methods.verifyPassword = function(password) {
  return password === this.password;
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;