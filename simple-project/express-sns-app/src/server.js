const express = require('express');
const setRouter = require("./routes");

const app = express();

setRouter(app);

app.listen('5001', ()=>{
  console.log('server start');
})