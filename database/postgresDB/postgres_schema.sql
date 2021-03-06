--  psql postgres < postgres_schema.sql

-- DROP DATABASE IF EXISTS reviews;
-- CREATE DATABASE reviews;

\connect reviews 

-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS properties CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- CREATE TABLE properties (
--   id SERIAL,
--   total_score real,
--   cleanliness_score real,
--   communication_score real,
--   checkin_score real,
--   accuracy_score real,
--   location_score real,
--   value_score real,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE users (
--   id SERIAL,
--   user_name VARCHAR(40),
--   user_image VARCHAR(75),
--   PRIMARY KEY (id)
-- );

CREATE TABLE reviews (
  id SERIAL,
  roomId INT,
  userId INT,
  review_date DATE,
  review_body VARCHAR(300),
  score real,
  cleanliness_score real,
  communication_score real,
  checkin_score real,
  accuracy_score real,
  location_score real,
  value_score real,
  PRIMARY KEY (id)
  -- FOREIGN KEY (roomId) REFERENCES properties (id),
  -- FOREIGN KEY (userId) REFERENCES users (id)
);

-- COPY properties FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/propertyGenerator.csv' DELIMITER',' CSV HEADER;
-- COPY users FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/userGenerator.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator1.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator2.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator3.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator4.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator5.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator6.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator7.csv' DELIMITER',' CSV HEADER;
-- COPY reviews FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/postgresDB/reviewGenerator8.csv' DELIMITER',' CSV HEADER;