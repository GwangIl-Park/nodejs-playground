const passport = require('passport');
const Localstrategy = require('passport-local');
const User = require('../models/users.model');

passport.use(new Localstrategy({usernameField: 'email', passwordField:'password'},
  (email, password, done)=>{
    User.findOne({
      email: email.toLocaleLowerCase()
    }, (err, user) => {
      if(err) return done(err);

      if(!user) return done(null, false, {msg: `Email ${email} not found`});
    })
}));