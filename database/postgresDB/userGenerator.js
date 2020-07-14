const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// create users -- up to 2.5 million users, 100 reviews each
const createUsers = () => {
  writer.pipe(fs.createWriteStream('./database/postGresDB/userGenerator.csv'));
  // will change to 2.5 mil later 2500000
  for (let i = 0; i < 2500000; i++) {
    writer.write({
      id: i + 1,
      user_name: faker.name.findName().toString(),
      user_image: faker.image.avatar(),
    });
  }
  writer.end();
  console.log('YAY! Users generated!');
};

createUsers();
