const User = require('./users');
const Problem = require('./problems');
const UserProblem = require('./users_problems');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/programming-urjc');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error!'));
db.once('open', function(){});

const CURRENT_YEAR = 2019;

module.exports.getProblemsFromCategory = (year, category) => {
  return Problem.find({ years: { "$in": [year] }, category }, { _id: 0, __v: 0 });
};

module.exports.getProblems = year => {
  return Problem.find({ years: { "$in": [year] } }, { _id: 0, __v: 0 });
};

module.exports.getUsers = (year, show_id=1) => {
  if(show_id)
    return User.find({ years: { "$in": [year] } });
  else
    return User.find({ years: { "$in": [year] } }, { __id: 0 } );
};

module.exports.solveProblem = async(code, domain, handler, solved, tried) => {
  if(domain === 'AER'){
    const problem = await Problem.findOne({ problem_code: code, domain });
    const user = await User.findOne({ aer_handler: handler });
    return UserProblem.update({ problem: problem._id, user: user._id }, { $set: { solved, tried } }, { upsert: true });
  }
  else if(domain === 'SPOJ'){
    const problem = await Problem.findOne({ problem_code: code, domain });
    const user = await User.findOne({ spoj_handler: handler });
    return UserProblem.update({ problem: problem._id, user: user._id }, { $set: { solved, tried } }, { upsert: true });
  }
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

module.exports.getProblemsCount = async(user, category, year) => {
  const total_problems = await Problem.find({ years: { "$in": [year] }, category }).count();
  const solved_problems = await UserProblem.aggregate([
    {
      $lookup: {
        from: "problems",
        localField: "problem",
        foreignField: "_id",
        as: "problems"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "users"
      }
    },
    {
      $unwind: "$problems"
    },
    {
      $unwind: "$users"
    },
    {
      $match: { "problems.years": { "$in": [year] }, "problems.category": category, "users._id": user._id, "solved": true }
    }
  ]);
  debugger;
  const unsolved_problems = await UserProblem.aggregate([
    {
      $lookup: {
        from: "problems",
        localField: "problem",
        foreignField: "_id",
        as: "problems"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "users"
      }
    },
    {
      $unwind: "$problems"
    },
    {
      $unwind: "$users"
    },
    {
      $match: { "problems.years": { "$in": [year] }, "problems.category": category, "users._id": user._id, "tried": true }
    }
  ]);
  return {
    solved: solved_problems.length,
    tried: unsolved_problems.length,
    total: total_problems
  };
};

module.exports.getUserProblemsFromCategory = (year, category) => {
  return UserProblem.aggregate([
    {
      $lookup: {
        from: "problems",
        localField: "problem",
        foreignField: "_id",
        as: "problems"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "users"
      }
    },
    {
      $unwind: "$problems"
    },
    {
      $unwind: "$users"
    },
    {
      $match: { "problems.category": category, "problems.years": { "$in": [year] } }
    }
  ]);
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
      const years = new Set(user_exists.years);
      years.add(CURRENT_YEAR);
      return User.update({ $or: [ { aer_handler: user.aer_handler }, { spoj_handler: user.spoj_handler }] }, { $set: { years: [...years], identifier: user.identifier, aer_handler: user.aer_handler, spoj_handler: user.spoj_handler } });
    }
    else{
      const user_model = new User(user);
      return user_model.save();
    }
  });
};

module.exports.removeProblem = url => {
  return Problem.findOne({ url }).then(problem => {
    if(!problem){
      return { error: 'Problem URL does not exist' };
    }
    else{
      const years = problem.years.filter(year => year != CURRENT_YEAR);
      return Problem.update({ url }, { $set: { years } });
    }
  });
};

module.exports.removeUser = identifier => {
  return User.findOne({ identifier }).then(user => {
    if(!user){
      return { error: 'User identifier does not exist' };
    }
    else{
      const years = user.years.filter(year => year != CURRENT_YEAR);
      return User.update({ identifier }, { $set: { years } });
    }
  });
};

module.exports.createProblem = problem => {
  return Problem.findOne({ url: problem.url }).then(problem_exists => {
    if(problem_exists){
      const years = new Set(problem_exists.years);
      years.add(CURRENT_YEAR);
      return Problem.update({ url: problem.url }, { $set: { years: [...years], problem_code: problem.problem_code, domain: problem.domain, category: problem.category, difficulty: problem.difficulty } });
    }
    else{
      const problem_model = new Problem(problem);
      return problem_model.save();
    }
  });
};
