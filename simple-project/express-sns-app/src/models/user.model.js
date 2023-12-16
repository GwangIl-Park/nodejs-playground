const mongoose = require('mongoose')
const {Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email:String,
  username:String,
  password:String,
  googleId:String,
  kakaoId:String
});

userSchema.methods.verifyPassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;