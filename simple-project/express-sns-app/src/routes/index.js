const commentRouter = require('./comments.router');
const friendRouter = require('./friends.router');
const likeRouter = require('./likes.router');
const mainRouter = require('./main.router');
const postRouter = require('./posts.router');
const profileRouter = require('./profiles.router');
const userRouter = require('./user.router');

const setRouter = (app) => {
  app.use('/', mainRouter);
  app.use('/auth', userRouter);
  app.use('posts', postRouter);
  app.use('/posts/:id/comments', commentRouter);
  app.use('/profile/:id', profileRouter);
  app.use('/friends', friendRouter);
  app.use(likeRouter);
}

module.exports = setRouter;