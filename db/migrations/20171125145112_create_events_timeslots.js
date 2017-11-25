
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('events_timeslots', function (table) {
    table.increments('events_timeslots_id').primary();
    table.integer('event_id').references('event_id').inTable('events');
    table.integer('timeslot_id').references('timeslot_id').inTable('timeslots');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('events_timeslots');
};