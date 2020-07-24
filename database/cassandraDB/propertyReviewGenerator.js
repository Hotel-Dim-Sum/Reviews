const faker = require('faker');
const fs = require('fs');

const getRandomRating = () => ((Math.random() * 2) + 3).toFixed(2);

const getRandomRoom = () => Math.floor(Math.random() * 50000000) + 1;

const getRandomUser = () => Math.floor(Math.random() * 2500000) + 1;

const getRandomDate = (start, end) => (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10));

const getRandomReviewText = () => faker.lorem.sentences(Math.floor(Math.random() * 2) + 1);

const createReviews = fs.createWriteStream('./database/cassandraDB/propertyReviewGenerator.csv');

const writeAllReviews = (writer, start, callback) => {
  let count = 0;
  const write = () => {
    let ok = true;
    while (ok && count < 50000000) {
      if (count % 10000000 === 0) {
        console.log(count);
      }
      count++;
      const roomId = getRandomRoom();
      const userId = getRandomUser();
      const date = getRandomDate(new Date(2018, 0, 1), new Date(2020, 0, 1));
      const text = getRandomReviewText();
      const score = getRandomRating();
      const cleanliness = getRandomRating();
      const communication = getRandomRating();
      const checkin = getRandomRating();
      const accuracy = getRandomRating();
      const location = getRandomRating();
      const value = getRandomRating();
      const data = `${roomId},${count},${userId},${date},${text},${score},${cleanliness},${communication},${checkin},${accuracy},${location},${value}\n`;
      if (count === 50000000) {
        writer.write(data, start, callback);
      } else {
        ok = writer.write(data, start);
      }
    }
    if (count < 50000000) {
      writer.once('drain', write);
    }
  };
  write();
};

writeAllReviews(createReviews, 'utf-8', () => { createReviews.end(); });
