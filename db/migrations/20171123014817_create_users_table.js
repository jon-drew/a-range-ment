
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.integer('user_id').primary();
    table.string('user_name');
    table.string('user_email').unique();
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};