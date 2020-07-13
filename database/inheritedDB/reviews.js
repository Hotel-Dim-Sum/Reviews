const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  roomId: Number,
  username: String,
  image: String,
  date: Date,
  text: String,
  scores: {
    cleanliness: Number,
    communication: Number,
    check_in: Number,
    accuracy: Number,
    location: Number,
    value: Number
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
