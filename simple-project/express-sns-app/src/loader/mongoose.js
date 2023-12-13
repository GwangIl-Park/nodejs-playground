const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongo connected'))
.catch((error)=>console.log(`mongo error > ${error}`));