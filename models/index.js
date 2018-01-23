const User = require('./users');
const Problem = require('./problems');
const UserProblem = require('./users_problems');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/programming-urjc');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error!'));
db.once('open', function(){});

module.exports.getProblemsFromCategory = category => {
  return Problem.find({ category });
};

module.exports.getUsers = () => {
  return User.find({});
};

module.exports.getUser = (handler_type, handler) => {
  if(handler_type === 'SPOJ'){
    return User.findOne({ spoj_handler: handler });
  }
  else if(handler_type === 'AER'){
    return User.findOne({ aer_handler: handler });
  }
  return {};
};

module.exports.getProblem = (domain, problem_code) => {
  return Problem.findOne({ domain, problem_code });
};

module.exports.setUsersProblems = users_problems => {
  return Promise.all(users_problems.map(async(user_problem) => {
    const prob = await getProblem(user_problem.domain, user_problem.problem_code);
    const user = await getUser(user_problem.domain, user_problem.user);
    return UserProblem.update({ problem: prob._id, user: user._id }, {
      $set: { problem: prob._id, user: user._id, solved: user_problem.solved }
    }, { upsert: true });
  }));
};

module.exports.createUser = user => {
  return User.findOne({ $or: [ { aer_handler: user.aer_handler }, { spoj_handler: user.spoj_handler }] }).then(user_exists => {
    if(user_exists){
      return { error: 'User with these handlers already exists' };
    }
    else{
      const user_model = new User(user);
      return user_model.save();
    }
  });
};

module.exports.createProblem = problem => {
  return Problem.findOne({ url: problem.url }).then(problem_exists => {
    if(problem_exists){
      return { error: 'Problem with this URL already exists' };
    }
    else{
      const problem_model = new Problem(problem);
      return problem_model.save();
    }
  });
};
