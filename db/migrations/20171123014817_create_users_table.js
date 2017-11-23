
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('user_id');
    table.string('user_email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};