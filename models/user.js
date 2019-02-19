const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userID: String,
  userPW: String,
  userAKA: String,
  month: Number,
  all: Number,
  admin: Boolean,
});

module.exports = mongoose.model('user', userSchema);
