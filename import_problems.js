const controller = require('./models/index');

//TODO A NICE INTERFACE

const PROBLEMS = [{
  problem_code: '116 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=116'
}, {
  problem_code: '140 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=140'
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
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=325'

}, {
  problem_code: 'CTRICK',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/CTRICK/'
}, {
  problem_code: 'CPRMT',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/CPRMT/'
}, {
  problem_code: 'ARDA1',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/ARDA1/'
}, {
  problem_code: 'KROW',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/KROW/'
}, {
  problem_code: 'DRAWM',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/DRAWM/'
}, {
  problem_code: '441 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=441'
}, {
  problem_code: '345 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=345'
}, {
  problem_code: '290 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=290'
}, {
  problem_code: '328 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=328'
}, {
  problem_code: 'BEENUMS',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/BEENUMS/'
}];

Promise.all(PROBLEMS.map(problem => {
  return controller.createProblem(problem);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
