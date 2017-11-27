"use strict";

const express = require('express');
const router  = express.Router();



module.exports = (knex) => {


var uId_length = 8;
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function generateRandomString(){
  var result = '';
  for (var i = 0; i < uId_length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

router.post("/", function(req, res) {
  let formOutput = req.body;
  const slug = generateRandomString();
  let userID = 0;
  knex.select('user_id')
    .from('users')
    .first()
    .where('user_email', formOutput.creator_email)
    .then((results) => {
       console.log(results);
       if (results === undefined) {
       knex
       .into('users')
       .insert({user_name: formOutput.creator_name, user_email: formOutput.creator_email})
       .returning("user_id")
       .then((inserted) => {
          console.log(inserted);
          userID = inserted[0];
             knex
              .insert({
              event_title: formOutput.event_title,
              event_location: formOutput.event_location,
              event_description:formOutput.event_description,
              event_slug:"/" + slug,
              creator_id: userID
            })
            .into('events')
            .returning('event_id')
            .then((inserted) => {
              let event_id = inserted[0];
              let timeslots = JSON.parse(formOutput.timeslots);

              for (var i in timeslots) {
                timeslots[i] = JSON.parse(timeslots[i]);
                timeslots[i]['event_id'] = event_id;
              }

              console.log(timeslots);

              knex
              .insert(timeslots)
              .into('timeslots')
              .returning('timeslot_id')
              .then((inserted) => {
                 const result = {
                 event_url : `Your event was successfully created! Your event url is: localhost:8080/event/${slug}`
                 }
                 res.status(200).send(JSON.stringify(result));
              });


            });
       });
      } else {
        userID = results.user_id;
           knex
            .insert({
            event_title: formOutput.event_title,
            event_location: formOutput.event_location,
            event_description:formOutput.event_description,
            event_slug:"/" + slug,
            creator_id: userID
          })
          .into('events')
          .returning('event_id')
          .then((inserted) => {
              let event_id = inserted[0];
              let timeslots = JSON.parse(formOutput.timeslots);
              for (var i in timeslots) {
                timeslots[i]['event_id'] = event_id;
              }
              console.log(timeslots);

              knex
              .insert(timeslots)
              .into('timeslots')
              .returning('timeslot_id')
              .then((inserted) => {
                 const result = {
                 event_url : `Your event was successfully created! Your event url is: localhost:8080/event/${slug}`
                 }
                 res.status(200).send(JSON.stringify(result));
              });
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });



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