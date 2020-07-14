const mongoose = require('mongoose');

const mongoDB = 'mongodb://172.17.0.2:27017/airbnb';
mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports = db;
