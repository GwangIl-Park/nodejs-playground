const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.listen(5151, ()=>{
  console.log('server start 5151')
})