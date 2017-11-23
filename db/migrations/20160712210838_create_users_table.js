exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id');
    table.string('user_email');
    table.string('password');
  });

  return knex.schema.createTable('events', function (table) {
    table.increments('user_id');
    table.string('event_title');
    table.string('event_location');
    table.string('event_description');
    table.string('event_slug');
    table.int('creator_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
  return knex.schema.dropTable('events');
};
