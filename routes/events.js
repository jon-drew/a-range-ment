"use strict";

const express = require('express');
const router  = express.Router();

function getUserByEmail(email) {
  return knex.select()
    .where({ user_email: email })
    .from('users')
    .first();
}

function generateEventID() {
  return
}


module.exports = (knex) => {

  router.post("/events", function(req, res) {

  return knex('events').insert({
    event_title: req.body.title,
    event_location: req.body.location,
    event_description: req.body.event_description,
    event_slug: "/" + event_id,
    creator_id: getUserByEmail(creator_email)
  })
      .from("events")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}