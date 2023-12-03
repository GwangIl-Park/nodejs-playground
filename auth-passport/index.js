const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(5000, () => {
  console.log('server listening');
});

mongoose
  .connect(
    'mongodb+srv://rkasud0:pp117611@cluster0.rpib5ho.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('mongo connected');
  });

app.use('/static', express.static(path.join(__dirname, 'public')));
