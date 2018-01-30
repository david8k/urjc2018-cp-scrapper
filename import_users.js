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
}, {
  identifier: 'Pablo San Juan',
  spoj_handler: 'pabloskijs',
  aer_handler: '8924',
}, {
  identifier: 'Jorge Prieto',
  spoj_handler: 'jorgeprg97',
  aer_handler: '5139',
}, {
  identifier: 'Marcos Vázquez',
  spoj_handler: 'marcosvm13',
  aer_handler: '8926',
}, {
  identifier: 'Rodrigo',
  spoj_handler: 'rodrima99',
  aer_handler: '8928',
}, {
  identifier: 'JoseFco',
  spoj_handler: 'josefco',
  aer_handler: '6271',
}, {
  identifier: 'Imanol Díaz',
  spoj_handler: 'zeusguy',
  aer_handler: '8931',
}, {
  identifier: 'Daniel Alexander',
  spoj_handler: 'dajm',
  aer_handler: '8932',
}, {
  identifier: 'Oleh Hrinchenko',
  spoj_handler: 'o_hrinchenko',
  aer_handler: '8933',
}, {
  identifier: 'Pepe',
  spoj_handler: 'pepe_segade',
  aer_handler: '8934',
}, {
  identifier: 'José Hernández',
  spoj_handler: 'jose_he_ch',
  aer_handler: '7257',
}, {
  identifier: 'Mónica',
  spoj_handler: 'mpastor',
  aer_handler: '8921',
}, {
  identifier: 'Daniel Rosado',
  spoj_handler: 'drosado',
  aer_handler: '8939',
}, {
  identifier: 'Hugo Samuel',
  spoj_handler: 'hgmoa',
  aer_handler: '4969',
}, {
  identifier: 'Adrián Martín Sánchez',
  spoj_handler: 'adrianmartin16',
  aer_handler: '8941',
}, {
  identifier: 'Sergio Perez',
  spoj_handler: 'n_tesla',
  aer_handler: '2248',
}, {
  identifier: 'Juan David',
  spoj_handler: 'jdavid18k',
  aer_handler: '8950',
}, {
  identifier: 'Samuel Abad',
  spoj_handler: 'sabadg_1991',
  aer_handler: '8953',
}, {
  identifier: 'Sergio Paniego',
  spoj_handler: 'sergiopaniego',
  aer_handler: '7528',
}, {
  identifier: 'Alberto Ortega',
  spoj_handler: 'alberto017',
  aer_handler: '7180',
}
//incluidos hasta el 32 (Alberto Ortega)
];

Promise.all(USERS.map(user => {
  return controller.createUser(user);
})).then(res => {
  console.log(res);
  console.log('DONE IMPORTING!');
  process.exit(0);
});
