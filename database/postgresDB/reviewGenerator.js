const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// create reviews -- between 0 - 50 reviews
const getRandomDate = (start, end) => (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10));

const getRandomRating = () => ((Math.random() * 2) + 3).toFixed(2);

const getRandomReviewText = () => faker.lorem.sentences(Math.floor(Math.random() * 3) + 2);

// change to 100 mil reviews
const createPropertyReviews = () => {
  writer.pipe(fs.createWriteStream('./database/postGresDB/reviewGenerator.csv'));
  // change to 10 mil for roomId
  // change to 2.5 mil for userId
  for (let i = 0; i < 50; i++) {
    const fakeDate = getRandomDate(new Date(2018, 0, 1), new Date(2020, 0, 1));
    writer.write({
      id: i + 1,
      roomId: faker.random.number({min: 1, max: 100}),
      username: faker.random.number({min: 1, max: 100}),
      review_date: fakeDate,
      review_body: getRandomReviewText(),
      score: getRandomRating(),
      cleanliness_score: getRandomRating(),
      communication_score: getRandomRating(),
      checkin_score: getRandomRating(),
      accuracy_score: getRandomRating(),
      location_score: getRandomRating(),
      value_score: getRandomRating(),
    });
  }
  writer.end();
  console.log('YAY! Reviews generated!');
};

createPropertyReviews();
