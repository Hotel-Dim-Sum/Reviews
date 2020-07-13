DROP KEYSPACE IF EXISTS reviews;
CREATE KEYSPACE IF NOT EXISTS reviews WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE reviews;

CREATE TABLE properties (
  room_id int PRIMARY KEY,
  total_score float,
  cleanliness_score float,
  communication_score float,
  checkin_score float,
  accuracy_score float,
  location_score float,
  value_score float
);

CREATE TABLE users (
  user_id int PRIMARY KEY,
  user_name varchar,
  user_image varchar
);

CREATE TABLE reviews_by_property (
  room_id int,
  review_id int,
  user_id int,
  review_date varchar,
  review_body varchar,
  score float,
  cleanliness_score float,
  communication_score float,
  checkin_score float,
  accuracy_score float,
  location_score float,
  value_score float,
  PRIMARY KEY (room_id, review_id)
);

CREATE TABLE reviews_by_user (
  user_id int,
  review_id int,
  room_id int,
  review_date varchar,
  review_body varchar,
  score float,
  cleanliness_score float,
  communication_score float,
  checkin_score float,
  accuracy_score float,
  location_score float,
  value_score float,
  PRIMARY KEY (user_id, review_id)
);

-- should i create a scores table? with the reviewId as the partitioning key?

-- ask about how to figure out how to reduce the number of reviews -- can consider what the minimum amount of data is -- 10 reviews? have the reviews for each property be a random number between 10 and 100? and then generate that many reviews for that property?

COPY properties (room_id, total_score, cleanliness_score, communication_score, checkin_score, accuracy_score, location_score, value_score) FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/cassandraDB/propertyGenerator.csv' with header=false and delimiter =',';

COPY users (user_id, user_name, user_image) FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/cassandraDB/userGenerator.csv' with header=false and delimiter =',';

COPY reviews_by_property (room_id, review_id, user_id, review_date, review_body, score, cleanliness_score, communication_score, checkin_score, accuracy_score, location_score, value_score) FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/cassandraDB/propertyReviewGenerator.csv' with header=false and delimiter =',';

COPY reviews_by_user (user_id, review_id, room_id, review_date, review_body, score, cleanliness_score, communication_score, checkin_score, accuracy_score, location_score, value_score) FROM '/Users/rebeccaquey/Documents/Rebecca_Repos/hrsf128/SDC/Reviews/database/cassandraDB/userReviewGenerator.csv' with header=false and delimiter =',';