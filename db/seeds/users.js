exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({user_id: 1, user_email: 'Alice@gmail.com', password: '123' }),
        knex('users').insert({user_id: 2, user_email: 'Bob@hotmail.com', password: 'abc'}),
        knex('users').insert({user_id: 3, user_email: 'Charlie@msn.com', password: '!@#'})
      ]);
      return Promise.all([
        knex('events').insert({event_id: 1, event_title: 'Party', event_location: 'My house', event_description:'Time to party',
                               event_slug: 1, creator_id: 3}),
        knex('events').insert({event_id: 2, event_title: 'Meeting', event_location: 'The office', event_description:'Time to work',
                               event_slug: 2, creator_id: 27}),
        knex('events').insert({event_id: 3, event_title: 'Game', event_location: 'Arena', event_description:'Time to play',
                               event_slug: 3, creator_id: 5}),
      ]);
    });
};