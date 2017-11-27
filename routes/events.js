"use strict";

const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

<<<<<<< HEAD
// function getUserByEmail(searchEmail) {
//   knex.select('user_id')
//     .from('users')
//     .first()
//     .where('user_email', searchEmail)
//     .then((results) => {
//       console.log(results.user_id);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   //return userID
// }

function generateRandomNumber() {
  let validChars = ['1','2','3','4','5','6','7','8','9','0']
  let newID = ''
  for (let i = 0; i < 6; i++) {
    newID += validChars[Math.floor((Math.random() * 10))]
  } return newID;
}

//console.log(getUserByEmail('bob@msn.com'))

function timestampConverter(inputDate) {
  // Input date in format MM/DD/YYYY (h)h:MM AM
  let outputDate = '';
  if (inputDate.length > 18) {
    outputDate += `${inputDate[6]}${inputDate[7]}${inputDate[8]}${inputDate[9]}-${inputDate[0]}${inputDate[1]}-${inputDate[3]}${inputDate[4]} ${inputDate[11]}${inputDate[12]}${inputDate[13]}${inputDate[14]}${inputDate[15]}:00`
  } else {
    outputDate += `${inputDate[6]}${inputDate[7]}${inputDate[8]}${inputDate[9]}-${inputDate[0]}${inputDate[1]}-${inputDate[3]}${inputDate[4]} 0${inputDate[11]}${inputDate[12]}${inputDate[13]}${inputDate[14]}:00`
=======

var uId_length = 8;
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function generateRandomString(){
  var result = '';
  for (var i = 0; i < uId_length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
>>>>>>> f18856c7d36c8608c563dd7478f175bccde5a432
  }
  return result;
}

<<<<<<< HEAD
  router.post("/", function(req, res) {
    let formOutput = req.body;
    let event_id = generateRandomNumber();
    knex.insert({
      event_id: event_id,
      event_title: formOutput.event_title,
      event_location: formOutput.event_location,
      event_description: formOutput.event_description,
      event_slug: "/" + event_id,
      start_datetime: timestampConverter(formOutput.datein),
      end_datetime: timestampConverter(formOutput.dateout),
      creator_email: formOutput.creator_email
    })
    .into('events')
    .returning('*')
    .then((inserted) => {
      console.log(inserted)
=======
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
>>>>>>> f18856c7d36c8608c563dd7478f175bccde5a432
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

