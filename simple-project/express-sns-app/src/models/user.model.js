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

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;