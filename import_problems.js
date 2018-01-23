const controller = require('./models/index');

//TODO A NICE INTERFACE

const PROBLEMS = [{
  problem_code: '116 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=116'
}, {
  problem_code: '101 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=101'
}, {
  problem_code: '435 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=435'
}];

Promise.all(PROBLEMS.map(problem => {
  return controller.createProblem(problem);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  return 'ok';
});
