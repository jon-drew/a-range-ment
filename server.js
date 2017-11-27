"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const moment = require('moment');
var nodemailer = require('nodemailer');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events");
const timeslotsRoutes = require("./routes/timeslots");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/events", eventsRoutes(knex));
app.use("/api/timeslots", timeslotsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


app.get("/event/:slug", (req, res) => {

  let templateVars = {};

  knex.select()
      .from("events")
      .innerJoin('users', 'users.user_id', 'events.creator_id')
      .innerJoin('timeslots', 'events.event_id', 'timeslots.event_id')
      .where('event_slug', '=', '/' + req.params.slug)
      .asCallback(function(err, rows) {
        console.log(rows);
        templateVars.event_title = rows[0].event_title;
        templateVars.event_description = rows[0].event_description;
        templateVars.event_location = rows[0].event_location;
        templateVars.invitor_name = rows[0].user_name;
        templateVars.invitor_email = rows[0].user_email;
        let time_slots = [];
        for (var i in rows) {
          let time_slot = {};
          time_slot['start_time'] = moment(rows[i]['start']).format('lll');
          time_slot['end_time'] = moment(rows[i]['end']).format('lll');
          time_slots.push(time_slot);
        }
        templateVars.time_slots = time_slots;
        res.render("participants", templateVars);
      });  
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


app.post('/send_confirmation', (req, res) => {

  const formOutput = req.body;
  console.log(formOutput);


  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'garima.arya1101@gmail.com',
    pass: '11012502d'
  }
  });

  var table = `<table>
                 <thead>
                 <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                 </tr>
                 </thead>
                 <tbody>`;
  var table_footer = `</tbody></table>`;
  for (var t in formOutput.timeslots) {

    var row = `<tr class="time-row">
          <td>${formOutput.timeslots[t].start_time}</td>
          <td>${formOutput.timeslots[t].end_time}</td>
        </tr>`;

    table = table + row;
  }

  table = table + table_footer;

  var mailOptions = {
  from: formOutput.participant_email,
  to: formOutput.invitor_email,
  subject: 'Your invitation was Accepted!',
  html: `<h2>This is to confirm that "${formOutput.participant_name}" 
         accepted your invitation for the event: "${formOutput.event_title}"
         for the following time slots: <br><br>${table}</h2>` 
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.status(200).send(JSON.stringify({result: "You have successfully accepted the invitation. Your invitor has been notified"}));
  }
  
});

});

