
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('events', function (table) {
    table.increments('event_id').primary();
    table.string('event_title');
    table.string('event_location');
    table.string('event_description');
    table.string('event_slug');
    table.integer('creator_id').references('user_id').inTable('users');
    table.timestamp('start_datetime');
    table.timestamp('end_datetime');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events');
};