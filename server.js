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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events");
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

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Post request

// http://localhost:8080/event/some-random-event

// app.post("/event", ())

app.get("/events", (req, res) => {


  let templateVars = {
    event_title: "Birthday Party",
    invitor_name: "Sagar Sharma",
    invitor_email: "sagar.s2502@gmail.com",
    event_description: "Guddu Birthday Party!!!",
    event_location: "Moga, India",
    time_slots: [{start_time: '2018-01-11 10:00 PM', end_time: '2018-01-11 11:00 PM'},
                 {start_time: '2018-01-11 09:00 AM', end_time: '2018-01-11 10:00 AM'},
                 {start_time: '2018-01-11 03:00 PM', end_time: '2018-01-11 04:00 PM'}]
  }
  res.render("participants", templateVars);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});



/*
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
