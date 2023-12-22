const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
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
  kakaoId: {
    type: String,
    unique: true,
    sparse: true,
  },
  username: {
    type: String,
    required:true,
    trim:true
  },
  firstName: {
    type: String,
    default: 'First Name'
  },
  lastName: {
    type: String,
    default: 'Last Name'
  },
  bio: {
    type: String,
    default: 'No Data'
  },
  contact: {
    type: Number,
    default: '01012345678'
  },
  friends: [{type:String}],
  friendRequest: [{type:String}]
}, {timestamps:true});

schema.methods.verifyPassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

schema.pre('save', function(next){
  let user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(this.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }
})

const model = mongoose.model('user', schema);

module.exports = model;