const controller = require('./models/index');

//TODO A NICE INTERFACE

const USERS = [{
  identifier: 'David Morán',
  spoj_handler: 'david_8k',
  aer_handler: '2226',
}, {
}];

Promise.all(USERS.map(user => {
  return controller.createUser(user);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  return 'ok';
});
