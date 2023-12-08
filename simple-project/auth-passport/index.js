const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/users.model');
const passport = require('passport');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  passport.authenticate("local", (err, user, info)=>{
    
  })
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async(req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      success:true
    });
  } catch(err) {
    console.log(err);
  }
});
app.listen(5000, () => {
  console.log('server listening');
});
