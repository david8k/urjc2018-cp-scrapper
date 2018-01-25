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
}, {
  problem_code: 'TEST',
  domain: 'SPOJ',
  category: 'SEMANA 1',
  url: 'http://www.spoj.com/problems/TEST/'
}, {
  problem_code: 'SHAHBG',
  domain: 'SPOJ',
  category: 'SEMANA 1',
  url: 'http://www.spoj.com/problems/SHAHBG/'
}, {
  problem_code: 'PANCAKES',
  domain: 'SPOJ',
  category: 'SEMANA 1',
  url: 'http://www.spoj.com/problems/PANCAKES/'
}, {
  problem_code: '437 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=437'
}, {
  problem_code: '413 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=413'
}, {
  problem_code: '397 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=397'
}, {
  problem_code: '325 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/mysubmissions.php?id=325'
}];

Promise.all(PROBLEMS.map(problem => {
  return controller.createProblem(problem);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
