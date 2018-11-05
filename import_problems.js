const controller = require('./models/index');

//TODO A NICE INTERFACE

const PROBLEMS = [];

Promise.all(PROBLEMS.map(problem => {
  return controller.createProblem(problem);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
