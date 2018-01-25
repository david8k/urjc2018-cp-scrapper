const mongoose = require('mongoose');

const problemsSchema = new mongoose.Schema({
  problem_code: { type: String },
  domain: { type: String },
  category: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Problems', problemsSchema);