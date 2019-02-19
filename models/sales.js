const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleSchema = new Schema({
  userID: String,
  goods: String,
  company: String,
  name: String,
  contact: String,
  price: { type: Number, default: 0 },
  spend: { type: Number, default: 0 },
  homepage: String,
  description: String,
  deposit: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('sale', saleSchema);
