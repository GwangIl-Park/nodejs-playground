const cookieSession = require('cookie-session')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router')
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

app.use('/',mainRouter)
app.use('/auth',usersRouter)