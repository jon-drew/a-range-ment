
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('events_users', function (table) {
    table.increments('events_users_id').primary();
    table.integer('event_id').references('event_id').inTable('events');
    table.integer('user_id').references('user_id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events_users');
};