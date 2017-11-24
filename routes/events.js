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

  router.post("/", function(req, res) {
    console.log(req.body);
    return knex('events').insert({
      event_title: "hello world", //req.body.title,
      event_location: "here", //req.body.location,
      event_description: "awesome", //req.body.event_description,
      event_slug: "/1" ,//"/" + event_id,
      creator_id: "22" //getUserByEmail(creator_email)
    })
  });

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("events")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  return router;
}

