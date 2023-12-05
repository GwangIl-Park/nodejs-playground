const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

userSchema.methods.comparePassword = (plainPassword, cb) => {
  if(plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({error:"error"})
}

const User = mongoose.model('User', userSchema);



module.exports = User;
