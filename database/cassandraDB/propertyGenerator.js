const fs = require('fs');
const csvWriter = require('csv-write-stream');

// const writer = csvWriter();

// create 10mil properties

const getRandomRating = () => ((Math.random() * 2) + 3).toFixed(2);

const createProperties = fs.createWriteStream('./database/cassandraDB/propertyGenerator.csv');

const writeAllProperties = (writer, start, callback) => {
  let count = 0;
  const write = () => {
    let ok = true;
    // change to 10mil later
    while (ok && count < 10000000) {
      // change to 1mil
      if (count % 1000000 === 0) {
        console.log(count);
      }
      count++;
      const totalScore = getRandomRating();
      const cleanliness = getRandomRating();
      const communication = getRandomRating();
      const checkin = getRandomRating();
      const accuracy = getRandomRating();
      const location = getRandomRating();
      const value = getRandomRating();
      const data = `${count},${totalScore},${cleanliness},${communication},${checkin},${accuracy},${location},${value}\n`;
      if (count === 10000000) {
        writer.write(data, start, callback);
      } else {
        ok = writer.write(data, start);
      }
    }
    if (count < 10000000) {
      writer.once('drain', write);
    }
  };
  write();
};

writeAllProperties(createProperties, 'utf-8', () => { createProperties.end(); });
