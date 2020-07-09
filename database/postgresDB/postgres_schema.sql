DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
USE reviews;

CREATE TABLE properties (
  id SERIAL,
  reviews SMALLINT,
  total_score SMALLINT,
  cleanliness_score SMALLINT,
  communication_score SMALLINT,
  checkin_score SMALLINT,
  accuracy_score SMALLINT,
  location_score SMALLINT,
  value_score SMALLINT,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id SERIAL,
  roomId INT,
  userId INT,
  review_date DATE,
  review_body VARCHAR(250),
  score SMALLINT,
  cleanliness_score SMALLINT,
  communication_score SMALLINT,
  checkin_score SMALLINT,
  accuracy_score SMALLINT,
  location_score SMALLINT,
  value_score SMALLINT,
  PRIMARY KEY (id),
  FOREIGN KEY (roomId) REFERENCES properties (id)
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(25),
  user_image VARCHAR(50),
  PRIMARY KEY (id)
);