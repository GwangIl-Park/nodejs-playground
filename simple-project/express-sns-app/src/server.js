const express = require('express');
const path = require('path');

require('dotenv').config()
require('./loader');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.get('/auth/login', (req, res, next) => {
  res.render('auth/login');
});

app.listen(5151, () => {
  console.log('server start');
});