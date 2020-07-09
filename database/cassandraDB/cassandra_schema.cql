DROP KEYSPACE IF EXISTS reviews;
CREATE KEYSPACE IF NOT EXISTS reviews WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 2};
USE reviews;

CREATE TABLE properties (
  id int PRIMARY KEY,
  reviews int,
  total_score int,
  cleanliness_score int,
  communication_score int,
  checkin_score int,
  accuracy_score int,
  location_score int,
  value_score int
);

CREATE TABLE reviews (
  id int,
  roomId int,
  userId int,
  review_date text,
  review_body text,
  score int,
  cleanliness_score int,
  communication_score int,
  checkin_score int,
  accuracy_score int,
  location_score int,
  value_score int,
  PRIMARY KEY (roomId, id) -- do i need to use userId for anything here? should i cluser by review_date?
  -- first field is the partitioning key 
  -- second field is the clustering key used to sort within the partition
);

CREATE TABLE users (
  id int PRIMARY KEY,
  username varchar(25),
  user_image varchar(50)
);

-- should i create a scores table? with the reviewId as the partitioning key?