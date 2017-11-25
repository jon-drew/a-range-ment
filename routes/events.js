"use strict";

const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

function getUserByEmail(email) {
  return knex.select('user_id')
    .where({ user_email: email })
    .from('users')
    .first();
}
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("events")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", function(req, res) {
    return knex('events').insert({
      event_id: 25,
      event_title: req.body.event_title,
      event_location: req.body.event_location,
      event_description: req.body.event_description,
      event_slug: "/" + 25,
      creator_id: getUserByEmail('creator_email')
    })
  });


  return router;
}

