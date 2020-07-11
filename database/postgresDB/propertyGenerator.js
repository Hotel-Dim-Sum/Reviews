const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// create properties -- 10 million properties
const getRandomNumber = () => Math.floor(Math.random() * 51);

const getRandomRating = () => ((Math.random() * 2) + 3).toFixed(2);

const createProperties = () => {
  writer.pipe(fs.createWriteStream('./database/postgresDB/propertyGenerator.csv'));
  // will change to 10 mil properties
  for (let i = 0; i < 100; i++) {
    writer.write({
      id: i + 1,
      // reviews: getRandomNumber(),
      total_score: getRandomRating(),
      cleanliness_score: getRandomRating(),
      communication_score: getRandomRating(),
      checkin_score: getRandomRating(),
      accuracy_score: getRandomRating(),
      location_score: getRandomRating(),
      value_score: getRandomRating(),
    });
  }
  writer.end();
  console.log('YAY! Properties generated!');
};

// scores are currently random, not averaged from all the reviews...

createProperties();
