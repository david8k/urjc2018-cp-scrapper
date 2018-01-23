const mongoose = require('mongoose');

const usersProblemsSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problems' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  solved: { type: Boolean, default: false },
});

module.exports = mongoose.model('UsersProblems', usersProblemsSchema);
