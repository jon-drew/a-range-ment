"use strict";

const express = require('express');
const router  = express.Router();



module.exports = (knex) => {

// function getUserByEmail(searchEmail) {
//   let userID = 0;
//   knex.select('user_id')
//     .from('users')
//     .first()
//     .where('user_email', searchEmail)
//     .then((results) => {
//       return userID = results;
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   return userID
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
  }
  return outputDate
}

  router.post("/", function(req, res) {
    let formOutput = req.body;
    let event_id = generateRandomNumber();
    knex.insert({
      event_id: event_id,
      event_title: formOutput.event_title,
      event_location: formOutput.event_location,
      event_description:formOutput.event_description,
      event_slug:"/" + event_id,
      start_datetime: timestampConverter(formOutput.datein),
      end_datetime: timestampConverter(formOutput.dateout),
      creator_email: formOutput.creator_email
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

