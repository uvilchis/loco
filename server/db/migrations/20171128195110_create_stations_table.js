
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('stations', function (table) {
      table.increments('id').primary();
      table.string('stop_name');
      table.string('stop_id');
      table.decimal('stop_lat');
      table.decimal('stop_lon');
    }),

    knex.schema.createTableIfNotExists('trains', function (table) {
      table.increments('id').primary();
      table.string('route_id');
      table.string('trip_id');
    }),

    knex.schema.createTableIfNotExists('times', function (table) {
      table.increments('id').primary();
      table.string('arrival_time');
    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('stations'),
    knex.schema.dropTableIfExists('trains'),
    knex.schema.dropTableIfExists('times')
  ])
};
