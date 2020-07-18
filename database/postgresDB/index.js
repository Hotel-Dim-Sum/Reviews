require('newrelic');

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'rebeccaquey',
  database: 'reviews',
  port: 5432
});

client.connect();

module.exports = client;
