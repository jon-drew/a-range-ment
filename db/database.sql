DROP TABLE if exists users CASCADE;
DROP TABLE if exists events CASCADE;
DROP TABLE if exists events_users;
DROP TABLE if exists timeslots CASCADE;
DROP TABLE if exists events_timeslots;
DROP DATABASE if exists midterm;

CREATE DATABASE midterm OWNER labber;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY
  -- CITEXT creates an implicit lowercase
  , user_email VARCHAR(500) NOT NULL UNIQUE
  , password VARCHAR(500) NOT NULL
);

CREATE TABLE events (
  event_id INT PRIMARY KEY
  , event_title VARCHAR(500)
  , event_location VARCHAR(500)
  , event_description VARCHAR(500)
  , event_slug VARCHAR(500)
  , creator_id INT REFERENCES users(user_id)
);

CREATE TABLE events_users (
  event_id INT REFERENCES events(event_id)
  , client_id INT REFERENCES users(user_id)
);

CREATE TABLE timeslots (
  timeslot_id SERIAL PRIMARY KEY
  , start_slot TIMESTAMP
  , end_slot TIMESTAMP
);

CREATE TABLE events_timeslots (
  event_id INT REFERENCES events(event_id)
  , timeslot_id INT REFERENCES timeslots(timeslot_id)
);