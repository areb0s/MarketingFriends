const mongoose = require('mongoose');

const { Schema } = mongoose;

const spendSchema = new Schema({
  userID: String,
  goods: String,
  name: String,
  price: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('spend', spendSchema);
