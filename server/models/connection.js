const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
    console.log('Database is connected');
  })
}
