const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');

router.use((req, res, next)=>{
  next();
});

router.post('/signup', async(req, res, next)=>{
  try {
    const user = await userModel.findOne({email:req.body.email});
    if(user) {
      throw new Error("User already exists");
    }

    userModel.create(req.body);
    res.redirect('/login');
  } catch(error) {
    next(error);
  }
});

module.exports = router;