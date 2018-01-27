const controller = require('./models/index');

//TODO A NICE INTERFACE

const USERS = [{
  identifier: 'David Morán',
  spoj_handler: 'david_8k',
  aer_handler: '2226',
}, {
  identifier: 'JoseMiguel92',
  spoj_handler: 'josemiguel_92',
  aer_handler: '8914',
}, {
  identifier: 'Jakub Luczyn',
  spoj_handler: 'jjluczyn',
  aer_handler: '5095',
}, {
  identifier: 'Isaac Lozano Osorio',
  spoj_handler: 'isaaclo97',
  aer_handler: '4920',
}, {
  identifier: 'EvaH',
  spoj_handler: 'Eva87',
  aer_handler: '8916',
}, {
  identifier: 'Iván Martín',
  spoj_handler: 'las_mas_debugs',
  aer_handler: '8640',
}, {
  identifier: 'Laura Alvarez',
  spoj_handler: 'laura_aj',
  aer_handler: '8917',
}, {
  identifier: 'León Castillejos',
  spoj_handler: 'p3450',
  aer_handler: '4914',
}, {
  identifier: 'Helena García',
  spoj_handler: 'h_garciago96',
  aer_handler: '8922',
}, {
  identifier: 'David Mestanza',
  spoj_handler: 'davidm_369',
  aer_handler: '8923',
}, {
  identifier: 'Luis Miguel',
  spoj_handler: 'luismii',
  aer_handler: '7273',
}
];

Promise.all(USERS.map(user => {
  return controller.createUser(user);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
