const Review = require('../database/reviews.js');

// GET REVIEW DATA
const reviewsMain = function (req, res) {
  const room = req.params.roomId;
  Review.find({ _roomId: room }).sort({ date: -1 })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data.slice(0, 6));
    });
};

// GET ALL REVIEW DATA FOR MODAL
const reviewsAll = function (req, res) {
  const room = req.params.roomId;
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Review.find({ _roomId: room }).sort({ date: -1 })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data.slice(startIndex, endIndex));
    });
};

// COMBINE REVIEW SCORES BASED ON ROOM ID
const reviewScores = function (req, res) {
  const room = req.params.roomId;
  const query = [
    {
      $match: {
        _roomId: Number(room)
      }
    },
    {
      $group: {
        _id: '$_roomId',
        total_cleanliness: { $avg: '$scores.cleanliness' },
        total_communication: { $avg: '$scores.communication' },
        total_check_in: { $avg: '$scores.check_in' },
        total_accuracy: { $avg: '$scores.accuracy' },
        total_location: { $avg: '$scores.location' },
        total_value: { $avg: '$scores.value' },
        total_reviews: { $sum: 1 }
      }
    }
  ];

  Review.aggregate(query)
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

// GET OVERALL RATING BASED ON AGGREGATE ROOM SCORES
const reviewOverall = function (req, res) {
  const room = req.params.roomId;
  const query = [
    {
      $match: {
        _roomId: Number(room)
      }
    },
    {
      $group: {
        _id: '$_roomId',
        total_cleanliness: { $avg: '$scores.cleanliness' },
        total_communication: { $avg: '$scores.communication' },
        total_check_in: { $avg: '$scores.check_in' },
        total_accuracy: { $avg: '$scores.accuracy' },
        total_location: { $avg: '$scores.location' },
        total_value: { $avg: '$scores.value' },
        total_reviews: { $sum: 1 }
      }
    },
    {
      $project: {
        total_reviews: '$total_reviews',
        total_score: {
          $avg: [
            '$total_cleanliness',
            '$total_communication',
            'total_check_in',
            'total_accuracy',
            'total_location',
            'total_value'
          ]
        }
      }
    }
  ];

  Review.aggregate(query)
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};


//CREATE/POST:
const postReview = function(req, res) {
  const room = req.params;
  Review.insertOne(room)
  .exec((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send('review posted: ', data);
    }
  });
}

//UPDATE/PUT:
//need to figure out what i want to update 
const updateReview = function(req, res) {
  const room = req.params.roomId;
  const update = req.params;
  Review.updateOne(
    {_roomId: room},
    {
      $set: {update},
    }
  )
}

//DELETE:
//delete one review??
// const deleteReview = function (req, res) {
//   const room = req.params.roomId;
//   Review.deleteOne({_roomId: room})
//   .exec((err, data) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       res.send('review deleted: ', data);
//     }
//   });
// }

//delete all reviews from particular property:
const deleteReviews = function(req, res) {
  const room = req.params.roomId;
  Review.deleteMany({_roomId: room})
  .exec((err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send('all reviews deleted: ', data);
    }
  });
}


module.exports = {
  reviewsMain,
  reviewsAll,
  reviewScores,
  reviewOverall,
  postReview,
  updateReview,
  deleteReviews,
};
