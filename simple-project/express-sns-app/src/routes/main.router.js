const express = require('express');
const { checkNotAuthenticated, checkAuthenticated } = require('../middlewares/auth.middleware');
const router = express.Router();

mainRouter.get('/', checkAuthenticated, (req, res) => {
  Post.find()
      .populate('comments')
      .sort({createdAt:-1})
      .exec((err, posts)=>{
        if(err) console.log(err);
        else {
          res.render('/posts', {
            posts:posts,
            currentUser:req.user
        });
        }
      });
});

router.get('/login', checkNotAuthenticated, (req, res, next)=>{
  res.render('/auth/login');
});

router.get('/signup', checkAuthenticated, (req, res, next)=>{
  res.render('/auth/signup');
})

module.exports = router;