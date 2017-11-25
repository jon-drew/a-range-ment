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

  router.post("/", function(req, res) {
    let formOutput = req.body;

      knex.insert({
        event_id: 28,
        event_title: formOutput.event_title,
        event_location: formOutput.event_location,
        event_description:formOutput.event_description,
        event_slug:"/" + 26,
        creator_id: 2//getUserByEmail('creator_email')
      })
      .into('events')
      .returning('*')
      .then((inserted) => {
        console.log(inserted)
      })
    res.status(200).send()
  });

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("events")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}

