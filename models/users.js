const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  next_update: { type: Number, default: 1 },
  spoj_handler: { type: String },
  aer_handler: { type: String },
  identifier: { type: String },
  years: { type: [Number], default: [2019] },
});

module.exports = mongoose.model('Users', usersSchema);
