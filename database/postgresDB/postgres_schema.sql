DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
-- USE reviews;

CREATE TABLE properties (
  id SERIAL,
  reviews INT,
  total_score INT,
  cleanliness_score INT,
  communication_score INT,
  checkin_score INT,
  accuracy_score INT,
  location_score INT,
  value_score INT,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id SERIAL,
  roomId INT,
  userId INT,
  review_date DATE,
  review_body VARCHAR,
  score INT,
  cleanliness_score INT,
  communication_score INT,
  checkin_score INT,
  accuracy_score INT,
  location_score INT,
  value_score INT,
  PRIMARY KEY (id),
  FOREIGN KEY (roomId) REFERENCES properties (id)
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR,
  user_image VARCHAR,
  PRIMARY KEY (id)
);