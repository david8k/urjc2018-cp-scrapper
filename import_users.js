const controller = require('./models/index');

//TODO A NICE INTERFACE

const USERS = [];
//incluidos hasta el 80 (segun numeracion del excel)

Promise.all(USERS.map(user => {
  return controller.createUser(user);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
