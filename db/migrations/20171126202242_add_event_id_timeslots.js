exports.up = function(knex, Promise) {
  return knex.schema.table('timeslots', function (t) {
    t.integer('event_id').references('event_id').inTable('events');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('timeslots', function (t) {
    t.dropColumn('event_id');
  });
};
