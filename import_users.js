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
}
];

Promise.all(USERS.map(user => {
  return controller.createUser(user);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
