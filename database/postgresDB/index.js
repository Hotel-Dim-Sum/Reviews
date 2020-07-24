require('newrelic');

// const { Client } = require('pg');

// const client = new Client({
//   host: 'localhost',
//   user: 'rebeccaquey',
//   database: 'reviews',
//   port: 5432
// });

// client.connect();

// module.exports = client;

const { Client, Pool } = require('pg');
//const connectionString = 'postgresql://18.144.133.128:5432/sdc_photogallery';
const pool = new Pool({
  user: 'rebeccaquey',
  host: 'localhost',
  database: 'reviews',
  port: 5432,
});
pool.connect(err => err ? console.log(err) : console.log('postgres pool is connected!'));
module.exports = pool;