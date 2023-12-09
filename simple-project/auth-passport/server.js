const cookieSession = require('cookie-session')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/users.model');
const passport = require('passport');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cookieEncrptionKey = 'supersecret-key'
app.use(cookieSession({
  name: 'cookie-session-name',
  keys: [cookieEncrptionKey]
}))

app.use(passport.initialize())
app.use(passport.session());
require('./config/passport');

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb) => {
          cb()
      }
  }
  next()
})

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log('mongo connected');
  });

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

app.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info)=>{
    if(err) return next(err);

    if(!user) return res.json({msg:info})

    req.logIn(user, (err)=>{
      if(err) return next(err);
      res.redirect('/');
    })
  })(req,res,next)
});

app.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup');
});

app.get('/', checkAuthenticated, (req,res)=>{
  res.render('./views')
})

app.post('/logout', (req, res, next) => {
  req.logOut((err) => {
    if(err) return next(err);
    res.redirect('/login')
  })
})

app.post('/signup', async(req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      success:true
    });
  } catch(err) {
    return next(err)
  }
});
app.listen(5000, () => {
  console.log('server listening');
});
