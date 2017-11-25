"use strict";

const express = require('express');
const router  = express.Router();

function getUserByEmail(email) {
  return knex.select()
    .where({ user_email: email })
    .from('users')
    .first();
}


module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("events")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", function(req, res) {
    console.log(req.body);
    return knex('events').insert({
      event_id: 25,
      event_title: req.body.event_title,
      event_location: req.body.event_location,
      event_description: req.body.event_description,
      event_slug: "/" + event_id,
      creator_id: getUserByEmail(creator_email)
    })
  });


  return router;
}

