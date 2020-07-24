const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// create reviews -- 100 million reviews, split between 10 million properties
const getRandomDate = (start, end) => (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10));

const getRandomRating = () => ((Math.random() * 2) + 3).toFixed(2);

const getRandomReviewText = () => faker.lorem.sentences(Math.floor(Math.random() * 2) + 1);

// 80 million, 10 million at a time, change the createWriteStream to go from 1 to 2 to 3 ... to 8
// change i to start from 0 to 10000000, then 10000000 to 20000000, etc.
// chunk it so that it is 4 files of 20mil each, for 80 million reviews?
const createPropertyReviews = () => {
  writer.pipe(fs.createWriteStream('./database/postGresDB/reviewGeneratorEXTRA.csv'));
  for (let i = 0; i < 10000000; i++) {
    const fakeDate = getRandomDate(new Date(2018, 0, 1), new Date(2020, 0, 1));
    writer.write({
      id: i + 80000001,
      // roomId: faker.random.number({min: 1, max: 10000000}),
      roomId: i + 1,
      userId: faker.random.number({min: 1, max: 2500000}),
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
