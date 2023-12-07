const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const refreshTokens = [];

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  const name = req.body.name;
  const accessToken = jwt.sign({ name }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '20s',
  });

  const refreshToken = jwt.sign({ name }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: '1d',
  });

  refreshTokens.push(refreshToken);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({ accessToken });
});

app.get('/refresh', (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: '30s',
      }
    );
    res.json({ accessToken });
  });
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.get('/', authMiddleware, (req, res) => {
  res.json({ result: 'success' });
});

app.listen(5000, () => {
  console.log(`server listening`);
});
