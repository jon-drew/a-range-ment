
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events_timeslots').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events_timeslots').insert({events_timeslots_id: 1, event_id: 1, timeslot_id: 475201}),
        knex('events_timeslots').insert({events_timeslots_id: 2, event_id: 1, timeslot_id: 475202}),
        knex('events_timeslots').insert({events_timeslots_id: 3, event_id: 1, timeslot_id: 475203}),
        knex('events_timeslots').insert({events_timeslots_id: 4, event_id: 1, timeslot_id: 475204}),
        knex('events_timeslots').insert({events_timeslots_id: 5, event_id: 1, timeslot_id: 475205}),
        knex('events_timeslots').insert({events_timeslots_id: 6, event_id: 1, timeslot_id: 475206}),
        knex('events_timeslots').insert({events_timeslots_id: 7, event_id: 1, timeslot_id: 475207}),
        knex('events_timeslots').insert({events_timeslots_id: 8, event_id: 2, timeslot_id: 475208}),
        knex('events_timeslots').insert({events_timeslots_id: 9, event_id: 3, timeslot_id: 475201}),
      ]);
    });
};
