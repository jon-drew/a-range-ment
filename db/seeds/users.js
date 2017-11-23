
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({user_id: 1, user_email: 'Alice@gmail.com', password: '123' }),
        knex('users').insert({user_id: 2, user_email: 'Bob@hotmail.com', password: 'abc'}),
        knex('users').insert({user_id: 3, user_email: 'Charlie@msn.com', password: '!@#'})
      ]);
    });
};