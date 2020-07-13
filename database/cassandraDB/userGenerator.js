const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

// const writer = csvWriter();

// create users -- 2.5 million users, 100 reviews each

const createUsers = fs.createWriteStream('./database/cassandraDB/userGenerator.csv');

const writeAllUsers = (writer, start, callback) => {
  let count = 0;
  let ok = true;
  const write = () => {
    ok = true;
    // change to 2.5mil later
    while (ok && count < 2500000) {
      // change to 1mil
      if (count % 1000000 === 0) {
        console.log(count);
      }
      count++;
      const name = faker.name.findName().toString();
      const image = faker.image.avatar();
      const data = `${count},${name},${image}\n`;
      if (count === 2500000) {
        writer.write(data, 'utf-8', callback);
      } else {
        ok = writer.write(data, 'utf-8');
      }
    }
    if (count < 2500000) {
      writer.once('drain', write);
    }
  };
  write();
};

writeAllUsers(createUsers, () => { createUsers.end(); });
