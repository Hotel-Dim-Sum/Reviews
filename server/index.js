require('newrelic');

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const port = 3002;

app.use(cors());
app.use('/reviews', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/reviews/:roomId', controller.getReviews);
app.get('/users/:userId', controller.getUser);
app.post('/reviews/:roomId', controller.postReview);
app.put('/reviews/:roomId', controller.updateReview);
app.delete('/reviews/:roomId', controller.deleteReviews);

app.listen(port, () => console.log(`v1 Listening at http://localhost:${port}/`));
