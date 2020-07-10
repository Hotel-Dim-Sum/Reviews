DROP KEYSPACE IF EXISTS reviews;
CREATE KEYSPACE IF NOT EXISTS reviews WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1;
USE reviews;

CREATE TABLE properties (
  room_id int PRIMARY KEY,
  reviews int,
  total_score int,
  cleanliness_score int,
  communication_score int,
  checkin_score int,
  accuracy_score int,
  location_score int,
  value_score int
);

CREATE TABLE reviews_by_property (
  room_id int,
  review_id int,
  user_id int,
  review_date text,
  review_body text,
  score int,
  cleanliness_score int,
  communication_score int,
  checkin_score int,
  accuracy_score int,
  location_score int,
  value_score int,
  PRIMARY KEY (room_id, review_id)
);

CREATE TABLE reviews_by_user (
  user_id int,
  review_id int,
  room_id int,
  review_date text,
  review_body text,
  score int,
  cleanliness_score int,
  communication_score int,
  checkin_score int,
  accuracy_score int,
  location_score int,
  value_score int,
  PRIMARY KEY (user_id, review_id)
)

CREATE TABLE users (
  user_id int PRIMARY KEY,
  username varchar(25),
  user_image varchar(50)
);

-- should i create a scores table? with the reviewId as the partitioning key?

-- ask about how to figure out how to reduce the number of reviews -- can consider what the minimum amount of data is -- 10 reviews? have the reviews for each property be a random number between 10 and 100? and then generate that many reviews for that property?