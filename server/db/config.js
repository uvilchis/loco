var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user: 'root',
    password: 'plantlife',
    database: 'mta_test_db'
  }
});

// quick note, we'll be needing a different configuration once we get to the AWS server
