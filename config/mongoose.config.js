const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/advance_mongoose')
  .then(() => console.log("DB connection establisehd"))
  .catch((err) => console.log("Something went wrong when connecting to MongoDB:", err))