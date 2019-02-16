const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to MONGOD server');
});

module.exports = mongoose;
