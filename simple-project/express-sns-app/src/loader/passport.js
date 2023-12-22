const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');
const KakaoStrategy = require('passport-kakao');
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

const googleStrategyConfig = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }

      if (existingUser) {
          return done(null, existingUser);
      } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.username = profile.displayName;
          user.firstName = profile.name.givenName;
          user.lastName = profile.name.familyName;
          user.googleId = profile.id;
          user.save((err) => {
              console.log(err);
              if (err) { return done(err); }
              done(null, user);
          })
      }
  })
})

passport.use('google', googleStrategyConfig);

const kakaoStrategyConfig = new KakaoStrategy({
  clientID: process.env.KAKAO_CLIENT_ID,
  callbackURL: '/auth/kakao/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ kakaoId: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
          return done(null, existingUser);
      } else {
          const user = new User();
          user.kakaoId = profile.id;
          user.email = profile._json.kakao_account.email;
          user.save((err) => {
              if (err) { return done(err); }
              done(null, user);
          })
      }
  })
})

passport.use('kakao', kakaoStrategyConfig);