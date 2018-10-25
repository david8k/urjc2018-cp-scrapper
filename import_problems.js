const controller = require('./models/index');

//TODO A NICE INTERFACE

const PROBLEMS = [{
  problem_code: '116 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=116',
  difficulty: 1,
}, {
  problem_code: '140 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=140',
  difficulty: 3,
}, {
  problem_code: '435 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=435',
  difficulty: 3,
}, {
  problem_code: 'TEST',
  domain: 'SPOJ',
  category: 'SEMANA 1',
  url: 'http://www.spoj.com/problems/TEST/',
  difficulty: 1,
}, {
  problem_code: 'SHAHBG',
  domain: 'SPOJ',
  category: 'SEMANA 1',
  url: 'http://www.spoj.com/problems/SHAHBG/',
  difficulty: 3,
}, {
  problem_code: 'PANCAKES',
  domain: 'SPOJ',
  category: 'SEMANA 1',
  url: 'http://www.spoj.com/problems/PANCAKES/',
  difficulty: 2,
}, {
  problem_code: '437 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=437',
  difficulty: 2,
}, {
  problem_code: '413 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=413',
  difficulty: 1,
}, {
  problem_code: '397 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=397',
  difficulty: 2,
}, {
  problem_code: '325 - ',
  domain: 'AER',
  category: 'SEMANA 1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=325',
  difficulty: 4,

}, {
  problem_code: 'CTRICK',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/CTRICK/',
  difficulty: 2,
}, {
  problem_code: 'CPRMT',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/CPRMT/',
  difficulty: 1,
}, {
  problem_code: 'ARDA1',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/ARDA1/',
  difficulty: 2,
}, {
  problem_code: 'KROW',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/KROW/',
  difficulty: 3,
}, {
  problem_code: 'DRAWM',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/DRAWM/',
  difficulty: 2,
}, {
  problem_code: '441 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=441',
  difficulty: 2,
}, {
  problem_code: '345 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=345',
  difficulty: 3,
}, {
  problem_code: '290 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=290',
  difficulty: 3,
}, {
  problem_code: '328 - ',
  domain: 'AER',
  category: 'SEMANA 2-1',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=328',
  difficulty: 5,
}, {
  problem_code: 'BEENUMS',
  domain: 'SPOJ',
  category: 'SEMANA 2-1',
  url: 'http://www.spoj.com/problems/BEENUMS/',
  difficulty: 2,

}, {
  problem_code: 'CISTFILL',
  domain: 'SPOJ',
  category: 'SEMANA 2-2',
  url: 'http://www.spoj.com/problems/CISTFILL/',
  difficulty: 4,
}, {
  problem_code: 'HOMO',
  domain: 'SPOJ',
  category: 'SEMANA 2-2',
  url: 'http://www.spoj.com/problems/HOMO/',
  difficulty: 4,
}, {
  problem_code: 'PQUEUE',
  domain: 'SPOJ',
  category: 'SEMANA 2-2',
  url: 'http://www.spoj.com/problems/PQUEUE/',
  difficulty: 2,
}, {
  problem_code: '396 - ',
  domain: 'AER',
  category: 'SEMANA 2-2',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=396',
  difficulty: 3,
}, {
  problem_code: '394 - ',
  domain: 'AER',
  category: 'SEMANA 2-2',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=394',
  difficulty: 2,
}, {
  problem_code: '152 - ',
  domain: 'AER',
  category: 'SEMANA 2-2',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=152',
  difficulty: 1,
}, {
  problem_code: '295 - ',
  domain: 'AER',
  category: 'SEMANA 2-2',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=295',
  difficulty: 1,
}, {
  problem_code: '386 - ',
  domain: 'AER',
  category: 'SEMANA 2-2',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=386',
  difficulty: 3,
}, {
  problem_code: '185 - ',
  domain: 'AER',
  category: 'SEMANA 2-2',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=185',
  difficulty: 1,
}, {
  problem_code: 'MTHUR',
  domain: 'SPOJ',
  category: 'SEMANA 2-2',
  url: 'http://www.spoj.com/problems/MTHUR/',
  difficulty: 1,

}, {
  problem_code: 'SGAME',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/SGAME/',
  difficulty: 1,
}, {
  problem_code: '352 - ',
  domain: 'AER',
  category: 'SEMANA 3',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=352',
  difficulty: 2,
}, {
  problem_code: 'IGALAXY',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/IGALAXY/',
  difficulty: 4,
}, {
  problem_code: 'CTOI09_1',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/CTOI09_1/',
  difficulty: 6,
}, {
  problem_code: '319 - ',
  domain: 'AER',
  category: 'SEMANA 3',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=319',
  difficulty: 3,
}, {
  problem_code: '253 - ',
  domain: 'AER',
  category: 'SEMANA 3',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=253',
  difficulty: 2,
}, {
  problem_code: 'CAPCITY',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/CAPCITY/',
  difficulty: 2,
}, {
  problem_code: 'PFDEP',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/PFDEP/',
  difficulty: 2,
}, {
  problem_code: 'STAMPS',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/STAMPS/',
  difficulty: 1,
}, {
  problem_code: 'FASHION',
  domain: 'SPOJ',
  category: 'SEMANA 3',
  url: 'http://www.spoj.com/problems/FASHION/',
  difficulty: 1,

}, {
  problem_code: '299 - ',
  domain: 'AER',
  category: 'SEMANA 4',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=299',
  difficulty: 2,
}, {
  problem_code: 'DAVIDG',
  domain: 'SPOJ',
  category: 'SEMANA 4',
  url: 'http://www.spoj.com/problems/DAVIDG/',
  difficulty: 3,
}, {
  problem_code: '310 - ',
  domain: 'AER',
  category: 'SEMANA 4',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=310',
  difficulty: 2,
}, {
  problem_code: 'CSTREET',
  domain: 'SPOJ',
  category: 'SEMANA 4',
  url: 'http://www.spoj.com/problems/CSTREET/',
  difficulty: 4,
}, {
  problem_code: 'BLINNET',
  domain: 'SPOJ',
  category: 'SEMANA 4',
  url: 'http://www.spoj.com/problems/BLINNET/',
  difficulty: 2,
}, {
  problem_code: 'EC_MODE',
  domain: 'SPOJ',
  category: 'SEMANA 4',
  url: 'http://www.spoj.com/problems/EC_MODE/',
  difficulty: 4,
}, {
  problem_code: 'IITWPC4I',
  domain: 'SPOJ',
  category: 'SEMANA 4',
  url: 'http://www.spoj.com/problems/IITWPC4I/',
  difficulty: 3,

}, {
  problem_code: 'CHICAGO',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/CHICAGO/',
  difficulty: 3,
}, {
  problem_code: 'HISIX',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/HISIX/',
  difficulty: 4,
}, {
  problem_code: 'FISHER',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/FISHER/',
  difficulty: 4,
}, {
  problem_code: 'GEORGE',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/GEORGE/',
  difficulty: 3,
}, {
  problem_code: '318 - ',
  domain: 'AER',
  category: 'SEMANA 5',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=318',
  difficulty: 2,
}, {
  problem_code: '281 - ',
  domain: 'AER',
  category: 'SEMANA 5',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=281',
  difficulty: 1,
}, {
  problem_code: '292 - ',
  domain: 'AER',
  category: 'SEMANA 5',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=292',
  difficulty: 5,
}, {
  problem_code: 'SHPATH',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/SHPATH/',
  difficulty: 2,
}, {
  problem_code: 'HIGHWAYS',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/HIGHWAYS/',
  difficulty: 1,
}, {
  problem_code: 'CDC12_E',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/CDC12_E/',
  difficulty: 3,
}, {
  problem_code: 'SUSY',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/SUSY/',
  difficulty: 6,
}, {
  problem_code: 'TRVCOST',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/TRVCOST/',
  difficulty: 0,
}, {
  problem_code: 'TRAFFICN',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/TRAFFICN/',
  difficulty: 3,
}, {
  problem_code: 'ADATRIP',
  domain: 'SPOJ',
  category: 'SEMANA 5',
  url: 'http://www.spoj.com/problems/ADATRIP/',
  difficulty: 0,
}, {
  problem_code: '116',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=116',
  difficulty: 0,
}, {
  problem_code: '117',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=117',
  difficulty: 0,
}, {
  problem_code: '191',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=191',
  difficulty: 0,
}, {
  problem_code: '313',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=313',
  difficulty: 0,
}, {
  problem_code: '363',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=362',
  difficulty: 0,
}, {
  problem_code: '368',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=368',
  difficulty: 0,
}, {
  problem_code: '369',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=369',
  difficulty: 0,
}, {
  problem_code: '380',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=380',
  difficulty: 0,
}, {
  problem_code: '407',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=407',
  difficulty: 0,
}, {
  problem_code: '413',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=413',
  difficulty: 0,
}, {
  problem_code: '433',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=433',
  difficulty: 0,
}, {
  problem_code: '434',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=434',
  difficulty: 0,
}, {
  problem_code: '456',
  domain: 'AER',
  category: 'SEMANA 6',
  url: 'https://www.aceptaelreto.com/problem/statement.php?id=456',
  difficulty: 0,
}];

Promise.all(PROBLEMS.map(problem => {
  return controller.createProblem(problem);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
