
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('timeslots', function (table) {
    table.increments('timeslot_id');
    table.timestamp('start');
    table.timestamp('end');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('timeslots');
};