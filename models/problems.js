const mongoose = require('mongoose');

const problemsSchema = new mongoose.Schema({
  problem_code: { type: String },
  domain: { type: String },
  category: { type: String },
  url: { type: String },
  difficulty: { type: Number },
  year: { type: Number, default: 2019 },
});

module.exports = mongoose.model('Problems', problemsSchema);
