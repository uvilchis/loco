var knex = require('knex')({
  client: 'mysql',
  connection: {
    socketPath: '',
    user: 'locodev',
    password: 'locodevelopers',
    database: 'loco'
  }
});

