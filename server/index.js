require('newrelic');
var compression = require('compression')
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const port = 3002;
const publicPath = path.join(__dirname, '/../client/dist')

app.use(compression())
app.use(cors());
app.use('/', express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/reviews/:roomId', (req, res) => {
  controller.getReviews(req, res);
});
app.get('/users/:userId', (req, res) => {
  controller.getUser(req, res);
});
app.post('/reviews/:roomId', (req, res) => {
  controller.postReview(req, res);
});
app.put('/reviews/:roomId', (req, res) => {
  controller.updateReview(req, res);
});
app.delete('/reviews/:roomId', (req, res) => {
  controller.deleteReviews(req, res);
});

// app.get('/reviews/:roomId', controller.getReviews);
// app.get('/users/:userId', controller.getUser);
// app.post('/reviews/:roomId', controller.postReview);
// app.put('/reviews/:roomId', controller.updateReview);
// app.delete('/reviews/:roomId', controller.deleteReviews);

app.listen(port, () => console.log(`v1 Listening at http://localhost:${port}/`));
