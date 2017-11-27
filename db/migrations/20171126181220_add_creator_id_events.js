exports.up = function(knex, Promise) {
  return knex.schema.table('events', function (t) {
    t.dropColumn('creator_email');
    t.integer('creator_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', function (t) {
    t.dropColumn('creator_id');
    t.string('creator_email');
  });
};
