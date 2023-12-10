const express = require('express');
const passport = require('passport');
const User = require('../models/users.model');
const usersRouter = express.Router();

usersRouter.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info)=>{
    if(err) return next(err);

    if(!user) return res.json({msg:info})

    req.logIn(user, (err)=>{
      if(err) return next(err);
      res.redirect('/');
    })
  })(req,res,next)
});

usersRouter.post('/logout', (req, res, next) => {
  req.logOut((err) => {
    if(err) return next(err);
    res.redirect('/login')
  })
})

usersRouter.post('/signup', async(req, res, next) => {
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

usersRouter.get('/auth/google', passport.authenticate('google'))
usersRouter.get('/auth/google/callback', passport.authenticate('google',{
  successReturnToOrRedirect:'/',
  failureRedirect:'/login'
}))