const express = require('express');
const { checkNotAuthenticated, checkAuthenticated } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/login', checkNotAuthenticated, (req, res, next)=>{
  res.render('/auth/login');
});

router.get('/signup', checkAuthenticated, (req, res, next)=>{
  res.render('/auth/signup');
})

module.exports = router;