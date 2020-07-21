const Review = require('../database/postgresDB/index.js');

// REDIS SET UP
// production redis url
// let redisUrl = process.env.REDIS_URL;

// if (process.env.ENVIRONMENT === 'development') {
//   require('dotenv').config();
//   redisUrl = 'redis://127.0.0.1';
// }

// // redis setup
// const client = require('redis').createClient(redisUrl);
// const Redis = require('ioredis');

// const redis = new Redis(redisUrl);


// READ/GET:
const getReviews = function (req, res) {
  const room = req.params.roomId;
  const query = `select * from reviews inner join properties on reviews.roomId = properties.id where reviews.roomId = ${room}`;
  Review.query(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data.rows);
    }
  });
};

const getUser = function (req, res) {
  const user = req.params.userId;
  const query = `select * from users where id = ${user}`;
  Review.query(query, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data.rows);
      res.status(200).send(data.rows);
    }
  });
};

// // REDIS GET REQUEST:
// const getReviews = function (req, res) {
//   const { roomId } = req.params;
//   const query = `select * from reviews inner join properties on reviews.roomId = properties.id where reviews.roomId = ${roomId}`;
//   client.get(roomId, (redisGetError, redisData) => {
//     if (redisGetError) {
//       res.status(500).json({ redisGetError });
//       return;
//     }
//     if (redisData) {
//       // eslint-disable-next-line max-len
//       // JSON objects need to be parsed after reading from redis, since it is stringified before being stored into cache
//       // console.log('redis has get!');
//       let rowData = redisData.rows;
//       res.status(200).json(JSON.parse(rowData));
//       console.log(rowData);
//     } else {
//       Review.query(query, (err, data) => {
//         if (err) {
//           res.sendStatus(500);
//         } else {
//           res.status(200).send(data.rows);
//           console.log(data.rows);
//           client.set(roomId, JSON.stringify(data), (redisSetError, result) => {
//             if (redisSetError) {
//               res.status(500).json({ redisSetError });
//             // } else {
//             //   console.log('redis has set!');
//             }
//           });
//         }
//       });
//     }
//   });
// };

// CREATE/POST:
const postReview = function (req, res) {
  const room = req.params;
  const query = '';
  Review.query();
  Review.insertOne(room)
    .exec((err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
};

// UPDATE/PUT:
const updateReview = function(req, res) {
  const room = req.params.roomId;
  const update = req.params;
  Review.updateOne(
    { roomId: room },
    {
      $set: { update },
    }
  )
    .exec((err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204).send(data);
      }
    });
};

// DELETE:
// delete all reviews from particular property:
const deleteReviews = function (req, res) {
  const room = req.params.roomId;
  Review.deleteMany({ roomId: room })
    .exec((err, data) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
};

module.exports = {
  getReviews,
  getUser,
  postReview,
  updateReview,
  deleteReviews,
};
