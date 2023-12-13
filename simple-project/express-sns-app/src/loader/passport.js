const passport = require('passport');
const LocalStrategy = require('passport-local');
const findUserByEmail = require('../repositories/user.repository');

passport.use(new LocalStrategy(
  function(email, password, done) {
    findUserByEmail.findUserByEmail(email)
    .then((user)=>{
      if(user && user.verifyPassword) return done(null, user);
      return done(null, false);
    })
    .catch((err)=> {
      return done(err);
    })
  }
));