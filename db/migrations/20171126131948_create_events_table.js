
exports.up = function(knex, Promise) {
  return knex.schema.table('events', function (t) {
    t.timestamp('start_datetime');
    t.timestamp('end_datetime');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', function (t) {
    t.dropColumn('start_datetime');
    t.dropColumn('end_datetime');
  });
};
