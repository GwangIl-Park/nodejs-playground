const passport = require('passport');
const LocalStrategy = require('passport-local');
const userModel = require('../models/user.model');

passport.use(new LocalStrategy(
  function(email, password, done) {
    userModel.findOne({email})
    .then((user)=>{
      if(user && user.verifyPassword) return done(null, user);
      return done(null, false);
    })
    .catch((err)=> {
      return done(err);
    })
  }
));